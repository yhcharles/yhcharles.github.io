// Web Speech API 实时转录应用
class LiveTranscribe {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.startTime = null;
        this.timerInterval = null;
        
        // DOM 元素
        this.elements = {
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            clearBtn: document.getElementById('clearBtn'),
            copyBtn: document.getElementById('copyBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            languageSelect: document.getElementById('languageSelect'),
            testLangBtn: document.getElementById('testLangBtn'),
            statusDot: document.getElementById('statusDot'),
            statusText: document.getElementById('statusText'),
            transcriptContent: document.getElementById('transcriptContent'),
            interimText: document.getElementById('interimText'),
            duration: document.getElementById('duration'),
            charCount: document.getElementById('charCount'),
            wordCount: document.getElementById('wordCount'),
            supportInfo: document.getElementById('supportInfo')
        };
        
        this.init();
    }
    
    init() {
        this.checkBrowserSupport();
        this.bindEvents();
        this.updateStats();
        this.detectLanguageSupport();
    }
    
    // 检查浏览器支持
    checkBrowserSupport() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showError('您的浏览器不支持 Web Speech API。请使用最新版本的 Chrome、Edge 或 Safari。');
            this.elements.startBtn.disabled = true;
            return false;
        }
        
        // 创建语音识别实例
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // 配置语音识别
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.lang = this.elements.languageSelect.value;
        
        this.setupRecognitionEvents();
        return true;
    }
    
    // 设置语音识别事件
    setupRecognitionEvents() {
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateStatus('listening', '正在听取...');
            this.elements.startBtn.disabled = true;
            this.elements.stopBtn.disabled = false;
            this.startTimer();
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateStatus('ready', '准备就绪');
            this.elements.startBtn.disabled = false;
            this.elements.stopBtn.disabled = true;
            this.stopTimer();
            
            // 清空临时文本
            this.elements.interimText.textContent = '';
        };
        
        this.recognition.onresult = (event) => {
            this.interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    this.finalTranscript += transcript + ' ';
                } else {
                    this.interimTranscript += transcript;
                }
            }
            
            this.updateTranscript();
        };
        
        this.recognition.onerror = (event) => {
            console.error('语音识别错误:', event.error);
            let errorMessage = '识别过程中出现错误';
            
            switch (event.error) {
                case 'no-speech':
                    errorMessage = '未检测到语音，请重试';
                    break;
                case 'audio-capture':
                    errorMessage = '无法访问麦克风，请检查权限设置';
                    break;
                case 'not-allowed':
                    errorMessage = '麦克风权限被拒绝，请允许麦克风访问';
                    break;
                case 'network':
                    errorMessage = '网络错误，请检查网络连接';
                    break;
                case 'service-not-allowed':
                    errorMessage = '语音服务不可用';
                    break;
                case 'language-not-supported':
                    errorMessage = '当前选择的语言不被支持，已自动切换到中文';
                    this.handleLanguageNotSupported();
                    break;
            }
            
            this.showError(errorMessage);
            this.stopRecognition();
        };
    }
    
    // 绑定事件监听器
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startRecognition());
        this.elements.stopBtn.addEventListener('click', () => this.stopRecognition());
        this.elements.clearBtn.addEventListener('click', () => this.clearTranscript());
        this.elements.copyBtn.addEventListener('click', () => this.copyTranscript());
        this.elements.downloadBtn.addEventListener('click', () => this.downloadTranscript());
        
        this.elements.languageSelect.addEventListener('change', (e) => {
            if (this.recognition) {
                this.recognition.lang = e.target.value;
                this.showNotification(`语言已切换到: ${e.target.options[e.target.selectedIndex].text}`, 'info');
            }
        });
        
        this.elements.testLangBtn.addEventListener('click', () => this.testLanguageSupport());
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        if (!this.isListening) {
                            this.startRecognition();
                        } else {
                            this.stopRecognition();
                        }
                        break;
                    case 'c':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.clearTranscript();
                        }
                        break;
                }
            }
        });
    }
    
    // 开始语音识别
    startRecognition() {
        if (!this.recognition) {
            this.showError('语音识别未初始化');
            return;
        }
        
        try {
            // 验证当前语言是否被支持
            const currentLang = this.elements.languageSelect.value;
            if (!this.isLanguageSupported(currentLang)) {
                this.showNotification('当前语言可能不被支持，建议切换到中文或英文', 'warning');
            }
            
            this.recognition.start();
            this.clearPlaceholder();
        } catch (error) {
            console.error('启动识别失败:', error);
            
            // 如果是因为已经在运行，先停止再重新开始
            if (error.message && error.message.includes('recognition') && error.message.includes('already')) {
                this.recognition.stop();
                setTimeout(() => {
                    this.startRecognition();
                }, 100);
            } else {
                this.showError('启动语音识别失败，请重试');
            }
        }
    }
    
    // 停止语音识别
    stopRecognition() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    // 更新转录文本
    updateTranscript() {
        // 更新最终文本
        if (this.finalTranscript) {
            this.elements.transcriptContent.textContent = this.finalTranscript;
            this.elements.transcriptContent.classList.remove('empty');
        }
        
        // 更新临时文本
        this.elements.interimText.textContent = this.interimTranscript;
        
        // 滚动到底部
        this.elements.transcriptContent.scrollTop = this.elements.transcriptContent.scrollHeight;
        
        // 更新统计信息
        this.updateStats();
    }
    
    // 清空转录文本
    clearTranscript() {
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.elements.transcriptContent.innerHTML = '<div class="placeholder">点击"开始录音"开始语音转录...</div>';
        this.elements.transcriptContent.classList.add('empty');
        this.elements.interimText.textContent = '';
        this.updateStats();
    }
    
    // 复制转录文本
    async copyTranscript() {
        if (!this.finalTranscript.trim()) {
            this.showNotification('没有可复制的文本', 'warning');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(this.finalTranscript.trim());
            this.showNotification('文本已复制到剪贴板', 'success');
        } catch (error) {
            console.error('复制失败:', error);
            this.showNotification('复制失败，请手动选择文本复制', 'error');
        }
    }
    
    // 下载转录文本
    downloadTranscript() {
        if (!this.finalTranscript.trim()) {
            this.showNotification('没有可下载的文本', 'warning');
            return;
        }
        
        const text = this.finalTranscript.trim();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `transcript_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        this.showNotification('转录文本已下载', 'success');
    }
    
    // 更新状态
    updateStatus(status, text) {
        this.elements.statusDot.className = `status-dot ${status}`;
        this.elements.statusText.textContent = text;
    }
    
    // 更新统计信息
    updateStats() {
        const text = this.finalTranscript.trim();
        const charCount = text.length;
        const wordCount = text ? text.split(/\s+/).length : 0;
        
        this.elements.charCount.textContent = charCount.toLocaleString();
        this.elements.wordCount.textContent = wordCount.toLocaleString();
    }
    
    // 开始计时
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.duration.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    // 停止计时
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    // 清除占位符
    clearPlaceholder() {
        if (this.elements.transcriptContent.classList.contains('empty')) {
            this.elements.transcriptContent.innerHTML = '';
            this.elements.transcriptContent.classList.remove('empty');
        }
    }
    
    // 处理语言不支持的情况
    handleLanguageNotSupported() {
        // 尝试使用备选语言列表
        const fallbackLanguages = ['zh-CN', 'en-US', 'en-GB'];
        const currentLang = this.elements.languageSelect.value;
        
        for (const lang of fallbackLanguages) {
            if (lang !== currentLang) {
                this.elements.languageSelect.value = lang;
                this.recognition.lang = lang;
                this.showNotification(`已自动切换到: ${this.elements.languageSelect.options[this.elements.languageSelect.selectedIndex].text}`, 'warning');
                break;
            }
        }
    }
    
    // 检测语言支持
    async detectLanguageSupport() {
        const languageOptions = this.elements.languageSelect.options;
        const supportedLanguages = [];
        
        for (let i = 0; i < languageOptions.length; i++) {
            const option = languageOptions[i];
            const langCode = option.value;
            
            // 简单的语言支持检测
            if (this.isLanguageSupported(langCode)) {
                supportedLanguages.push(langCode);
            } else {
                // 标记不支持的语言
                option.textContent += ' (可能不支持)';
                option.style.color = '#95a5a6';
            }
        }
        
        // 如果当前选择的语言不支持，切换到支持的语言
        if (supportedLanguages.length > 0 && !supportedLanguages.includes(this.elements.languageSelect.value)) {
            this.elements.languageSelect.value = supportedLanguages[0];
            this.recognition.lang = supportedLanguages[0];
        }
    }
    
    // 检查语言是否被支持
    isLanguageSupported(langCode) {
        // 基于浏览器和系统的常见支持情况
        const commonSupported = ['zh-CN', 'en-US', 'en-GB'];
        const browserSupported = {
            'Chrome': ['zh-CN', 'en-US', 'en-GB', 'ja-JP', 'ko-KR', 'fr-FR', 'de-DE', 'es-ES'],
            'Edge': ['zh-CN', 'en-US', 'en-GB', 'ja-JP', 'ko-KR', 'fr-FR', 'de-DE', 'es-ES'],
            'Safari': ['zh-CN', 'en-US', 'en-GB', 'ja-JP', 'fr-FR', 'de-DE', 'es-ES']
        };
        
        // 检测浏览器类型
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        const isEdge = /Edg/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        
        if (isChrome && browserSupported.Chrome.includes(langCode)) return true;
        if (isEdge && browserSupported.Edge.includes(langCode)) return true;
        if (isSafari && browserSupported.Safari.includes(langCode)) return true;
        
        // 回退到通用支持列表
        return commonSupported.includes(langCode);
    }
    
    // 测试语言支持
    testLanguageSupport() {
        const currentLang = this.elements.languageSelect.value;
        const langName = this.elements.languageSelect.options[this.elements.languageSelect.selectedIndex].text;
        const browserName = this.getBrowserName();
        
        const isSupported = this.isLanguageSupported(currentLang);
        
        if (isSupported) {
            this.showNotification(`✅ ${langName} 在 ${browserName} 浏览器中被支持`, 'success');
        } else {
            this.showNotification(`⚠️ ${langName} 在 ${browserName} 浏览器中可能不被支持，建议使用中文或英文`, 'warning');
        }
        
        // 显示详细的浏览器信息
        console.log(`浏览器信息: ${navigator.userAgent}`);
        console.log(`当前语言: ${currentLang} (${langName})`);
        console.log(`支持状态: ${isSupported ? '支持' : '不支持或未知'}`);
    }
    
    // 获取浏览器名称
    getBrowserName() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes('Chrome') && userAgent.includes('Google Inc')) {
            return 'Chrome';
        } else if (userAgent.includes('Edg')) {
            return 'Edge';
        } else if (userAgent.includes('Safari') && userAgent.includes('Apple Computer')) {
            return 'Safari';
        } else if (userAgent.includes('Firefox')) {
            return 'Firefox (不支持Web Speech API)';
        } else {
            return '未知浏览器';
        }
    }
    
    // 显示错误信息
    showError(message) {
        this.elements.supportInfo.className = 'support-info error';
        this.elements.supportInfo.querySelector('.info-content i').className = 'fas fa-exclamation-triangle';
        this.elements.supportInfo.querySelector('.info-content p').textContent = message;
    }
    
    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new LiveTranscribe();
    
    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && app.isListening) {
            // 页面隐藏时停止识别以节省资源
            app.stopRecognition();
        }
    });
    
    // 添加离开页面前的确认
    window.addEventListener('beforeunload', (e) => {
        if (app.isListening) {
            e.preventDefault();
            e.returnValue = '正在进行语音识别，确定要离开吗？';
        }
    });
    
    // 显示键盘快捷键提示
    console.log(`
🎙️ 实时语音转录快捷键：
• Ctrl/Cmd + Enter: 开始/停止录音
• Ctrl/Cmd + Shift + C: 清空文本
• 支持多语言识别
• 实时显示识别结果
    `);
}); 