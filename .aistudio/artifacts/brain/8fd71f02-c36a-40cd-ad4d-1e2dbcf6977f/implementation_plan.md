# Kế hoạch dọn dẹp và khôi phục mã nguồn về nguyên bản (Gỡ bỏ các cấu hình GitHub)

## User Review & Critical Decisions

> [!IMPORTANT]
> Dựa trên lựa chọn của bạn:
> - **Phạm vi**: Xóa toàn bộ các phần đã thêm cho GitHub để mã nguồn sạch sẽ, tinh gọn như ban đầu.
> - **vite.config.ts**: Khôi phục hoàn toàn về nguyên bản ban đầu.

---

## 1. Overview & Clean-up Scope

Kế hoạch này sẽ loại bỏ toàn bộ các tệp và đoạn mã phát sinh trong quá trình thiết lập GitHub Pages, đưa cấu trúc dự án về trạng thái chuẩn, gọn gàng và không còn bất kỳ dòng mã phụ trợ nào:

1. **`index.html`**:
   - Xóa bỏ đoạn mã JavaScript kiểm tra và chuẩn hóa `trailing slash` trong thẻ `<head>`.
2. **`vite.config.ts`**:
   - Xóa dòng `base: './'`, khôi phục cấu hình Vite nguyên bản.
3. **`package.json`**:
   - Khôi phục lệnh `"build": "vite build"`.
   - Xóa các lệnh `"predeploy"` và `"deploy"`.
   - Gỡ bỏ gói phụ thuộc `"gh-pages"` khỏi `devDependencies`.
4. **`.github/workflows/deploy.yml`**:
   - Xóa hoàn toàn tệp workflow triển khai tự động.

---

## 2. Technical Architecture & File Changes

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KẾ HOẠCH HOÀN NGUYÊN MÃ NGUỒN                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   1. index.html ──────────> Bỏ script trailing slash                   │
│   2. vite.config.ts ──────> Bỏ base: './' (trả về nguyên bản)          │
│   3. package.json ────────> Bỏ predeploy, deploy, khôi phục build      │
│   4. package.json ────────> Gỡ bỏ thư viện gh-pages                    │
│   5. .github/ ────────────> Xóa workflow deploy.yml                    │
│                                                                        │
│   KẾT QUẢ: Mã nguồn sạch 100%, không còn code thừa                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Steps

1. **Bước 1**: Chỉnh sửa `index.html` để xóa đoạn script URL normalization.
2. **Bước 2**: Chỉnh sửa `vite.config.ts` để gỡ bỏ thuộc tính `base`.
3. **Bước 3**: Chỉnh sửa `package.json` khôi phục lại các script ban đầu và loại bỏ `gh-pages`.
4. **Bước 4**: Xóa tệp `/.github/workflows/deploy.yml`.
5. **Bước 5**: Chạy `compile_applet` và `lint_applet` để xác nhận ứng dụng biên dịch hoàn toàn sạch sẽ và hoạt động trơn tru.
