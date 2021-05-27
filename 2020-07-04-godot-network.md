# Using WebRTC multiplayer in Godot (v3.2)

The following diagram shows the process of creating WebRTCMultiplayer using signaling server.

**Stage 1. Init peer on all clients**


```sequence
Title: Creating WebRTCMultiplayer using signaling server\nStage 1: init peer

p1 -> S: connect to signaling server
S -> p1: reply with ID
note over p1: init multiplayer with ID
p2 -> S: connect to signaling server
S -> p2: reply with ID
note over p2: init multiplayer with ID
S -> p2: notify p1 already connected
note over p2: init peer of p1
S -> p1: notify p2 connected
note over p1: init peer of p2
```

**Stage 2. One of the clients start to establish connection by creating offer, assuming it's p1 here**

```sequence
Title: Creating WebRTCMultiplayer using signaling server\nStage 2: establish connection

note over p1: create offer\n(emit session_description_created, with type "offer"),\n set local description
note over p1: (on session_description_created)\n send offer
p1 -> S: send offer
S -> p2: forward offer
note over p2: set remote description\n(will automatically generate answer)\n(emit session_description_created, with type "answer")
note over p2: (on session_description_created)\n send answer
p2 -> S: send answer
S -> p1: forward answer
note over p1: receive answer,\n set remote description\n(emit ice_candidate_created)
note over p1: (on ice_candidate_created)\nsend candidate
p1 -> S: send candidate
S -> p2: forward candidate
note over p2: add ice candidate

```



