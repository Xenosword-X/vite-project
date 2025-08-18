# Vue 3 Composition API Todo List 專案｜整合遠端 API 與使用者驗證

這是一個使用 Vue 3 + Composition API + Pinia 架構開發的 Todo List 應用，透過遠端 API 完成註冊 / 登入 / 清單管理功能。專案整合狀態管理、token 驗證與資料操作，為練習前端實戰技能的完整範例。

🔗 **Demo 線上預覽**  
👉 [點我查看](https://xenosword-x.github.io/vite-project/index.html)

---

## 📌 專案特色

- 使用者註冊 / 登入 / 登出功能，並整合 token 驗證流程
- 串接遠端 API 實作 Todo 清單 CRUD（新增、刪除、編輯、切換完成狀態）
- 使用 `Pinia` 管理待辦事項與使用者登入狀態
- 使用 localStorage 儲存登入狀態
- 使用 Vue-i18n 建立多語言資料
- 操作介面提供錯誤提示、登入失敗回饋
- 使用 Vite 作為開發與打包工具，提供 **快速啟動、即時熱更新（HMR）與輕量化模組管理**

---

## 📁 技術與工具

- Vue 3 + Composition API
- Vite 打包工具  
- Pinia 狀態管理
- Vue Router 路由切換
- Axios 串接 API
- Bootstrap 5 響應式 UI 排版
- Sweetalert 2 彈出式視窗套件應用
- Vue-i18n 多語言套件

---

## 📚 學習心得

這個專案是我以 Vue 3 + Composition API 為基礎，搭配 Vite 建構的多語言 TodoList 系統。相較於 Vue CLI，此版本更著重於模組化開發、環境變數管理與部署流程。透過整合 `Pinia` 狀態管理、`import.meta.env` 環境變數與 GitHub Pages 的 `base` 設定，我實際體驗了現代前端開發中 Vite 所帶來的高效與輕量化。

此外，我也針對打包後路徑問題、SCSS 編譯與模組化結構進行優化，強化了對專案架構整合與部署細節的掌握，讓我更能應對企業實務中的開發環境切換與部署要求。

---

## 📝 備註

- 此作品為練習用途，使用的 API 為學習平台提供，資料僅供展示與功能測試。
- API 來源：[五倍學院 Todoo API](https://todoo.5xcamp.us/)
