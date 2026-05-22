### 1. 配置你的默认/本地 Profile 捕获状态

iTerm2 需要知道你什么时候登录以及什么时候退出。

1. 打开 iTerm2 设置：Cmd + , -> 选择 **Profiles** 选项卡。
    
2. 选中你当前默认的 Profile（比如 Default），点击右侧的 **Advanced** 选项卡。
    
3. 找到 **Triggers**，点击 **Edit**。
    
4. 正确添加一条触发规则，用于捕获通用的 user@hostname 提示符：
    
    - **Regular Expression**: ^(\w+)@([\w.-]+) _(根据你服务器的实际提示符调整，如果是类似 [user@host ~]$，也可以用 ^[(\w+)@([\w.-]+))_
        
    - **Action**: Report User & Host
        
    - **Parameters**: \1@\2
        
    - **Instant**: 勾选
        

### 2. 创建一个远程服务器专属的 Profile

1. 在左侧 Profile 列表中，选中你的默认 Profile，点击下方的 **Other Actions**（或右键）选择 **Duplicate Profile** 复制一份。
    
2. 将这个新 Profile 重命名（例如命名为 Production-Server）。
    
3. 去 **Colors** 选项卡里，把背景色（Background）调成警示色，或者在右下角的 **Color Presets...** 里选一个完全不同的色彩主题。
    
4. 去 **Advanced** 选项卡，找到 **Automatic Profile Switching (APS)**。
    
5. 点击 **+** 号添加规则，指定在什么域名或 IP 下激活它。支持通配符，例如：
    
    - root@192.168.1.*
        
    - *@your-production-domain.com
        
    - 或者只填主机名：_my-company-jumpserver_
        

配置好后，当你通过 SSH 连入符合 APS 规则的机器时，终端检测到提示符输出就会秒切主题；退出 SSH 回到本地主机时，它找不到匹配规则，就会自动退回到默认的本地主题。