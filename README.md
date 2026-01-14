# 月亮棋 (Moon Chess)

## 项目简介 (Project Introduction)

一个源于原神伴月纪闻的类似于井字棋的网页游戏，规则只比井字棋多了一条：在双方落下第三个棋子之后，第一个棋子闪烁，落下第四个棋子后第一个棋子消失，也就是说在棋盘上两位棋手分别最多只有三个棋子在棋盘上面。

A web game inspired by Genshin Impact's "Moonlit Chronicles," similar to tic-tac-toe, with only one additional rule: after both players place their third piece, the first placed piece begins to blink; after placing the fourth piece, the first piece disappears. This means that at any time, each player can have at most three pieces on the board.

## 技术实现 (Technical Implementation)

- **前端技术**：原生 HTML、CSS 和 JavaScript
- **模块化设计**：使用类封装游戏逻辑，代码结构清晰
- **CSS 动画**：实现棋子放置和闪烁效果
- **响应式布局**：使用 CSS Grid 和 Flexbox 实现自适应布局
- **多语言支持**：通过语言包对象实现中英文切换

- **Frontend technology**：Native HTML, CSS, and JavaScript
- **Modular design**：Using classes to encapsulate game logic, clear code structure
- **CSS animations**：Implementing piece placement and flashing effects
- **Responsive layout**：Using CSS Grid and Flexbox to achieve adaptive layout
- **Multi-language support**：Implementing Chinese-English switching through language pack objects

## 如何使用 (How to Use)

1. 克隆或下载本项目到本地
2. 在项目根目录运行本地服务器
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx http-server -p 8000
   ```
3. 在浏览器中访问 `http://localhost:8000`

1. Clone or download this project to your local machine
2. Run a local server in the project root directory
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server -p 8000
   ```
3. Visit `http://localhost:8000` in your browser


## 项目结构 (Project Structure)

```
yueliangqi/
├── index.html          # 游戏主页面
├── style.css           # 游戏样式
├── script.js           # 游戏逻辑
├── README.md           # 项目说明文件
└── LICENSE             # 许可证文件
```

## 许可证 (License)

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

## 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

Welcome to submit Issues and Pull Requests to help improve this project!

---

**享受游戏乐趣！** 🌙✨

**Enjoy the game!** 🌙✨