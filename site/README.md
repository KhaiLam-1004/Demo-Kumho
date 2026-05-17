# Kumho NPP Portal — CMS Demo

Static HTML/CSS prototype của hệ thống quản lý kênh phân phối Kumho. Built từ các file design (Tailwind CDN) trong `Role Kumho/` và `Role NPP/`, ghép thành 1 site có thể demo trọn vòng đời theo `Flow.md`.

## Cấu trúc

```
site/
├── index.html                  # Login chung — auto-detect role (email→Kumho, SĐT→NPP)
├── doi-mat-khau-lan-dau.html   # B2 — NPP buộc đổi mật khẩu lần đầu
├── ho-so.html                  # Hồ sơ cá nhân + đổi mật khẩu (dùng chung 2 role)
├── assets/
│   ├── theme-config.js         # Tailwind config (màu, typo, spacing) — shared
│   ├── theme.css               # Inter + Material Symbols + utilities
│   ├── auth.js                 # Session localStorage + role guard
│   ├── partials.js             # Render sidebar + topbar (DRY) + chặn vào sai role
│   └── app.js                  # Modal, toast, bulk-select handler
├── kumho/                      # Role Kumho — chỉ hiện sau khi login bằng email
│   ├── duyet-dai-ly.html         # B4 — Landing + bulk approve/reject
│   ├── chi-tiet-dai-ly.html      # B4 — Detail review
│   ├── quan-ly-npp.html          # NPP list
│   ├── npp-chi-tiet.html         # NPP detail
│   ├── quan-ly-dai-ly.html       # System-wide dealer view
│   ├── quan-ly-don-hang.html     # Order view-only
│   └── lich-su-tra-qua.html      # B7 — Scheme history
└── npp/                        # Role NPP — chỉ hiện sau khi login bằng SĐT
    ├── quan-ly-dai-ly.html       # B3 — Dealer list
    ├── tao-dai-ly.html           # B3 — Create single
    ├── import-dai-ly.html        # B3 — Bulk Excel import
    ├── chi-tiet-dai-ly.html      # Dealer detail
    ├── don-hang-xac-nhan.html    # B6 — Pending orders
    ├── chi-tiet-don-hang.html    # B6 — Confirm/reject detail
    ├── lich-su-don-hang.html     # Order history
    └── lich-su-tra-thuong.html   # B7 — Scheme reward history
```

## Cơ chế login chung & role guard

- `index.html` chỉ có **một form duy nhất** với ô "Email hoặc SĐT" — không cần chọn role thủ công:
  - Chuỗi có `@` → đăng nhập vai trò **Kumho Admin** → vào `kumho/...`
  - Chuỗi toàn chữ số → đăng nhập vai trò **NPP** → vào `npp/...`
  - Checkbox "Lần đầu đăng nhập" (chỉ áp dụng NPP, mô phỏng B2) → ép đi qua trang **đổi mật khẩu lần đầu** trước khi vào portal.
- Session được lưu trong `localStorage` (`kumho_npp_session`).
- Mỗi trang role gọi `Auth.requireRole('kumho' | 'npp')` trong `partials.js`:
  - Không có session → bật về `index.html`.
  - Sai role (vd. NPP cố mở URL trực tiếp `kumho/duyet-dai-ly.html`) → tự redirect về landing của role thật.
  - Còn cờ `firstLogin` → quay về trang đổi mật khẩu.
- Sidebar + topbar được render bằng `partials.js` dựa trên role trong session → **menu luôn đúng vai trò**, không hiện nhầm chức năng.

## Flow demo

Theo `Flow.md` (CMS Kumho Portal):

| Bước | Trang demo |
|------|-----------|
| B1 — Import NPP (admin gotit) | *(out of scope — chỉ mô tả trong landing)* |
| B2 — NPP đăng nhập | `index.html` → chọn vai trò NPP |
| B3 — NPP tạo / import đại lý | `npp/tao-dai-ly.html` · `npp/import-dai-ly.html` |
| B4 — Kumho duyệt | `kumho/duyet-dai-ly.html` (inline + bulk) · `kumho/chi-tiet-dai-ly.html` (deep review) |
| B5 — Đại lý nhập đơn qua Miniapp | *(out of scope — Miniapp riêng)* |
| B6 — NPP xác nhận đơn | `npp/don-hang-xac-nhan.html` · `npp/chi-tiet-don-hang.html` |
| B7 — Tích luỹ scheme & trả quà | `kumho/lich-su-tra-qua.html` · `npp/lich-su-tra-thuong.html` |

## Chạy local

Pure HTML — chỉ cần serve thư mục `site/` qua bất kỳ static server nào:

```bash
# Python
cd site && python -m http.server 8080

# Node
npx serve site
```

Mở `http://localhost:8080`.

## Deploy lên GitHub Pages

1. Tạo repo trên GitHub (vd. `kumho-npp-demo`).
2. Push code:

   ```bash
   cd c:/Users/khai/Demo-Kumho
   git init
   git add site/
   git commit -m "Initial CMS demo"
   git branch -M main
   git remote add origin https://github.com/<user>/kumho-npp-demo.git
   git push -u origin main
   ```

3. Vào **Settings → Pages**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / folder `/site` (hoặc đổi tên thư mục thành `/docs` để chọn `/docs`)
4. GitHub Pages sẽ build trong vài phút. URL: `https://<user>.github.io/kumho-npp-demo/`.

> File `.nojekyll` đã được thêm để Pages bỏ qua Jekyll processing (nếu không, các path bắt đầu bằng `_` sẽ bị skip).

## Lưu ý kỹ thuật

- **Tailwind CDN**: dùng Play CDN (`cdn.tailwindcss.com`), config inject qua `assets/theme-config.js` để tất cả page chia chung design tokens. Production thật nên build Tailwind tĩnh để loại bỏ FOUC.
- **Sidebar/Topbar** được render run-time bởi `partials.js` qua `<div data-shell data-role data-active>`, tránh duplicate markup trong mỗi page.
- Các tương tác demo (modal, toast, bulk select) thuần JS, không cần framework.
- Toàn bộ dữ liệu mock cứng — phục vụ demo UX, không có backend.
