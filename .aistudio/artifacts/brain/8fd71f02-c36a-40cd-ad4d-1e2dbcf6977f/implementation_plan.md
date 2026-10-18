# Kế hoạch khắc phục lỗi màn hình trắng và cấu hình tự động đẩy lên GitHub Pages (`npm run deploy`)

## User Review & Critical Decisions

> [!IMPORTANT]
> Dựa trên câu trả lời của bạn:
> - **Hiện tượng**: Màn hình trắng hoàn toàn không hiện nội dung.
> - **Phương thức mong muốn**: Cấu hình lệnh `npm run deploy` tự động đẩy bản build lên nhánh `gh-pages` một chạm.

### Nguyên nhân gây ra màn hình trắng (Blank Page):
1. **Lỗi đường dẫn tương đối khi thiếu dấu gạch chéo cuối (`trailing slash`)**: Khi người dùng truy cập link dạng `https://<username>.github.io/<tên-repo>` (không có `/` ở cuối), trình duyệt hiểu thư mục hiện tại là root domain và tải nhầm tài nguyên từ `https://<username>.github.io/assets/...` thay vì thư mục con của repo.
2. **Cơ chế Single Page App (SPA) trên GitHub Pages**: GitHub Pages là máy chủ tĩnh (static server). Nếu truy cập hoặc refresh sẽ bị 404 hoặc không load được `index.html` nếu không có file `404.html` dự phòng.
3. **Phương thức build & deploy**: Cần công cụ đóng gói chuyên dụng `gh-pages` để đưa trực tiếp thư mục `dist` lên nhánh riêng biệt `gh-pages` mà không làm xáo trộn mã nguồn gốc.

---

## 1. Overview & Core Solution

- **Mục tiêu**: Giúp bạn xem được website Alpha-K52 trên GitHub Pages một cách mượt mà chỉ với một lệnh duy nhất:
  ```bash
  npm run deploy
  ```
- **Các bước xử lý**:
  1. Cài đặt thư viện `gh-pages` vào `devDependencies`.
  2. Bổ sung script trong `package.json`:
     - `"predeploy": "npm run build"` (tự động build code mới nhất trước khi deploy).
     - `"deploy": "gh-pages -d dist"` (tự động đẩy thư mục build lên nhánh `gh-pages` trên GitHub).
  3. Cải tiến cấu hình `vite.config.ts`: Xử lý base linh hoạt, bảo đảm asset luôn tìm đúng thư mục dù truy cập link có hay không có dấu `/` ở cuối.
  4. Thêm script tự động sao chép `dist/index.html` thành `dist/404.html` để chống lỗi 404 khi người dùng refresh hoặc truy cập trực tiếp.
  5. Cung cấp hướng dẫn trực quan bằng tiếng Việt: Chuyển cấu hình GitHub Pages sang nhánh `gh-pages`.

---

## 2. Technical Architecture & Deployment Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUY TRÌNH DEPLOY GITHUB PAGES                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   Mã nguồn dự án (Nhánh main)                                          │
│        │                                                               │
│        ▼ [Lệnh: npm run deploy]                                        │
│   1. Chạy "predeploy" ──> "npm run build"                              │
│        │                                                               │
│        ▼                                                               │
│   2. Xuất thư mục "dist/" (index.html, 404.html, assets/ css/js)       │
│        │                                                               │
│        ▼                                                               │
│   3. Thư viện "gh-pages" tự tạo commit & đẩy sang nhánh "gh-pages"    │
│        │                                                               │
│        ▼                                                               │
│   GitHub Pages kích hoạt từ nhánh "gh-pages" ──> HIỂN THỊ WEB 100%    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Steps

1. **Cài đặt package `gh-pages`**:
   - Sử dụng `install_applet_package` để cài đặt `gh-pages` làm devDependency.
2. **Cập nhật `package.json`**:
   - Thêm `"predeploy": "npm run build && cp dist/index.html dist/404.html 2>/dev/null || true"`.
   - Thêm `"deploy": "gh-pages -d dist"`.
3. **Cập nhật `vite.config.ts`**:
   - Tối ưu `base` và thẻ script để trình duyệt load đúng bundle JS/CSS trên GitHub Pages.
4. **Kiểm tra biên dịch & đóng gói thử nghiệm**:
   - Chạy thử `npm run build` để xác nhận thư mục `dist` và file `404.html` sẵn sàng.
5. **Hướng dẫn người dùng chạy lệnh**:
   - Cung cấp lệnh `npm run deploy` và thao tác chọn nhánh `gh-pages` trong GitHub Settings.
