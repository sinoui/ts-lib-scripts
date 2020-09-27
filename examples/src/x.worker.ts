onmessage = (event) => {
  postMessage(`回复的内容：${event.data}`);
};
