document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, attempting to fetch docs.md');
    fetch('docs.md')
        .then(response => {
            console.log('Fetch response received:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log('Markdown content loaded, length:', text.length);
            document.getElementById('content').innerHTML = marked.parse(text);
            if (window.location.hash) {
                scrollToTarget(window.location.hash);
            }
        })
        .catch(error => {
            console.error('Error loading Markdown file:', error);
            document.getElementById('content').innerHTML = `
                <p>Error loading content: ${error.message}</p>
                <p>Please ensure that:</p>
                <ul>
                    <li>The 'docs.md' file exists in the same directory as 'index.html'</li>
                    <li>You are running this site through a web server, not directly from the file system</li>
                    <li>Your web server is configured to serve .md files</li>
                </ul>
            `;
        });

    // 为导航链接添加平滑滚动效果
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToTarget(targetId);
            // 更新 URL，但不触发页面刷新
            history.pushState(null, '', targetId);
        });
    });
});

function scrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}
