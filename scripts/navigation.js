/**
 * 通用导航控制脚本
 * 提供浏览器原生的返回和关闭功能
 */

// 浏览器返回功能
function goBack() {
    // 检查是否有历史记录可以返回
    if (history.length > 1) {
        history.back();
    } else {
        // 如果没有历史记录，则跳转到主页
        window.location.href = '../index.html';
    }
}

// 关闭当前页面/标签页
function closePage() {
    // 尝试关闭当前窗口/标签页
    if (window.opener) {
        // 如果是通过其他窗口打开的，关闭当前窗口
        window.close();
    } else {
        // 如果无法关闭窗口，则返回上一页
        goBack();
    }
}

// 初始化导航控制
function initNavigation() {
    // 查找所有带有返回图标的链接
    const backButtons = document.querySelectorAll('a i.fa-arrow-left');
    backButtons.forEach(icon => {
        const link = icon.parentElement;
        if (link.tagName === 'A') {
            // 将链接改为JavaScript调用
            link.href = 'javascript:void(0)';
            link.onclick = goBack;
        }
    });

    // 查找所有带有关闭图标的链接
    const closeButtons = document.querySelectorAll('a i.fa-times');
    closeButtons.forEach(icon => {
        const link = icon.parentElement;
        if (link.tagName === 'A') {
            // 将链接改为JavaScript调用
            link.href = 'javascript:void(0)';
            link.onclick = closePage;
        }
    });

    // 查找所有包含"Back"文本的链接
    const textBackButtons = document.querySelectorAll('a');
    textBackButtons.forEach(link => {
        if (link.textContent.trim() === 'Back' || link.textContent.trim() === '返回') {
            link.href = 'javascript:void(0)';
            link.onclick = goBack;
        }
    });

    // 查找所有"Cancel"按钮
    const cancelButtons = document.querySelectorAll('a');
    cancelButtons.forEach(link => {
        if (link.textContent.trim() === 'Cancel' || link.textContent.trim() === '取消') {
            link.href = 'javascript:void(0)';
            link.onclick = goBack;
        }
    });
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
});

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Alt + 左箭头 = 返回
    if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
    }
    
    // Ctrl + W = 关闭页面
    if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        closePage();
    }
    
    // ESC = 返回
    if (e.key === 'Escape') {
        goBack();
    }
}); 