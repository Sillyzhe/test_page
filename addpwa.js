(function () {
  let ua = navigator.userAgent.toLowerCase();
  // 判断是否是桌面环境打开的
  if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) return
    // 默认不展示按钮，仅支持 「Add to Home Screen」 功能才展现

  if (ua.indexOf('chrome') !== -1) {
    let deferredPrompt;
    self.addEventListener('beforeinstallprompt', (e) => {
      // 防止 Chrome 67 及更早版本自动显示安装提示
      e.preventDefault();
      // 稍后再触发此事件
      deferredPrompt = e;
      // 更新 UI 以提醒用户可以将 App 安装到桌面
      const addBtn = document.createElement('span')
      addBtn.innerText = '添加到桌面'
      addBtn.style.position = 'fixed'
      addBtn.style.bottom = '30px';
      addBtn.style.right = '30px';
      addBtn.style.padding = '10px'
      addBtn.style.backgroundColor = "#fff";
      addBtn.style.borderRadius = '4px';
      addBtn.style.cursor = 'pointer'
      addBtn.style.display = 'block';
      document.body.insertBefore(addBtn, document.body.firstElementChild);

      addBtn.addEventListener('click', (e) => {
        // 显示安装提示
        deferredPrompt.prompt();

        // 等待用户反馈
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            deferredPrompt = null;
          } else {
            console.log('User dismissed the A2HS prompt');
            addBtn.style.display = 'block';
          }
        });
      });
    });
  }
})()
