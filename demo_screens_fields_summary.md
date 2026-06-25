# Tổng Hợp Màn Hình & Field Cho Demo — Phase 1

> **Phạm vi tổng hợp:** 3 module BRD chính của Kumho Portal Phase 1
> - **NPP — Quản Lý Đại Lý** (`kumho_CMS_npp_dealer_business_rules.md`)
> - **NPP — Xác Nhận Đơn Hàng** (`kumho_CMS_npp_order_confirm_business_rules.md`)
> - **Kumho — Duyệt Đại Lý** (`kumho_CMS_kumho_dealer_approval_business_rules.md`)
>
> **Mục đích:** Liệt kê đầy đủ màn hình + field + action để map vào demo web tĩnh.

---

## Mục lục

- [A. Module NPP — Quản Lý Đại Lý](#a-module-npp--quản-lý-đại-lý)
  - [A1. Màn Danh sách đại lý](#a1-màn-danh-sách-đại-lý)
  - [A2. Modal Tạo đại lý đơn lẻ](#a2-modal-tạo-đại-lý-đơn-lẻ)
  - [A3. Popup Import Excel + Màn Preview Import](#a3-popup-import-excel--màn-preview-import)
  - [A4. Màn Chi tiết đại lý (page riêng)](#a4-màn-chi-tiết-đại-lý-page-riêng)
  - [A5. Trang Sửa đại lý (page riêng)](#a5-trang-sửa-đại-lý-page-riêng)
  - [A6. Popup Khoá / Mở khoá](#a6-popup-khoá--mở-khoá)
- [B. Module NPP — Xác Nhận Đơn Hàng](#b-module-npp--xác-nhận-đơn-hàng)
  - [B1. Màn Danh sách đơn chờ xác nhận](#b1-màn-danh-sách-đơn-chờ-xác-nhận)
  - [B2. Màn Chi tiết & Xác nhận đơn](#b2-màn-chi-tiết--xác-nhận-đơn)
  - [B3. Popup Confirm Duyệt đơn](#b3-popup-confirm-duyệt-đơn)
  - [B4. Popup Từ chối duyệt đơn](#b4-popup-từ-chối-duyệt-đơn)
- [C. Module Kumho — Duyệt Đại Lý](#c-module-kumho--duyệt-đại-lý)
  - [C1. Màn Danh sách đại lý chờ duyệt](#c1-màn-danh-sách-đại-lý-chờ-duyệt)
  - [C2. Màn Chi tiết & Duyệt / Từ chối (đơn lẻ)](#c2-màn-chi-tiết--duyệt--từ-chối-đơn-lẻ)
  - [C3. Popup Duyệt đơn lẻ](#c3-popup-duyệt-đơn-lẻ)
  - [C4. Popup Từ chối đơn lẻ](#c4-popup-từ-chối-đơn-lẻ)
  - [C5. Popup Duyệt Hàng Loạt](#c5-popup-duyệt-hàng-loạt)
  - [C6. Popup Kết quả Bulk](#c6-popup-kết-quả-bulk)
- [D. Toast / Notification UI](#d-toast--notification-ui)
- [E. Component dùng chung](#e-component-dùng-chung)
- [F. Trạng thái Entity](#f-trạng-thái-entity)

---

## A. Module NPP — Quản Lý Đại Lý

### A1. Màn Danh sách đại lý

**Chức năng:** Search · Filter · Phân trang · Sort · Tạo mới · Import · Xem chi tiết · Sửa.

**Cột bảng:**

| Cột | Loại |
| --- | --- |
| Tên đại lý | text |
| SĐT đại lý | text |
| Tỉnh thành | text |
| Khu vực | text (nhiều KV cách nhau dấu phẩy) |
| Trạng thái | badge (Chờ duyệt / Hoạt động / Đã từ chối / Đã khoá) |
| Ngày tạo | dd/MM/yyyy |
| Thao tác | 👁 Xem · ✎ Sửa *(chỉ khi Hoạt động / Đã từ chối)* |

**Bộ điều khiển:**

- **Search input** — theo Tên đại lý hoặc SĐT đại lý
- **Filter:** Tỉnh thành (dropdown), Trạng thái (dropdown 4 option)
- **Per-page:** 10 / 20 / 50 / 100 (default 10)
- **Sort mặc định:** Ngày tạo giảm dần
- **Nút header:** `+ Tạo đại lý mới` · `Import Excel`

**Empty state:** CTA *"+ Tạo đại lý mới"* khi NPP chưa có đại lý nào.

---

### A2. Modal Tạo đại lý đơn lẻ

**Trigger:** Click `+ Tạo đại lý mới` ở danh sách.

**Form fields:**

| Field | Kiểu | Required | Ràng buộc |
| --- | --- | --- | --- |
| Tên đại lý | input text | ✅ | Tối đa 255 ký tự |
| SĐT đại lý | input text | ✅ | 10 số, prefix 03/05/07/08/09 |
| Địa chỉ đại lý | input text | ✅ | Tối đa 255 ký tự |
| Tỉnh thành | dropdown | ✅ | Master data Tỉnh / Thành phố |
| Khu vực | dropdown multi-select | ✅ | Subset Khu vực NPP, ≥ 1. NPP có 1 KV → auto chọn + disable |

**Footer:** `[Huỷ]` · **`[Gửi duyệt]`** *(disable khi field bắt buộc trống / chưa chọn Khu vực)*.

**Popup phụ — Huỷ form:**
- Nếu chưa nhập field nào → đóng modal trực tiếp.
- Nếu đã nhập ≥ 1 field → popup *"Bạn có chắc muốn huỷ? Dữ liệu đã nhập sẽ mất"* với `[Quay lại]` · `[Xác nhận]`.

**Validation messages:**
- SĐT sai format → *"Số điện thoại không đúng định dạng (10 chữ số, bắt đầu 03/05/07/08/09)"*
- SĐT trùng đại lý của NPP này → *"Số điện thoại đã thuộc đại lý của bạn"*
- SĐT trùng đại lý NPP khác → *"Số điện thoại đã tồn tại trong hệ thống"*
- Khu vực chưa chọn → *"Vui lòng chọn ít nhất 1 Khu vực"*

---

### A3. Popup Import Excel + Màn Preview Import

#### A3.1. Popup Upload
- Nút **`Tải template mẫu`** *(file `dai_ly_import_template.xlsx`)*
- Vùng drop file `.xlsx`
- Nút `[Huỷ]`

**Validation file-level:** sai định dạng / > 5MB / sai header / file rỗng / > 500 dòng → huỷ toàn file kèm message lỗi.

#### A3.2. Màn Preview Import *(full screen hoặc large modal)*

**Header thống kê:** *"Tổng {Z} dòng — {X} hợp lệ — {Y} lỗi"*.

**Tab filter:**
- *Tất cả ({Z})*
- *Hợp lệ ({X})*
- *Lỗi ({Y})* — default tab này nếu Y > 0

**Bảng dữ liệu** (phân trang 50/trang, chọn 20/50/100):

| Cột | Mô tả |
| --- | --- |
| STT | Vị trí dòng trong file |
| Tên đại lý | text |
| SĐT đại lý | text |
| Địa chỉ đại lý | text |
| Tỉnh thành | text |
| Khu vực | text (nhiều KV cách dấu phẩy) |
| Trạng thái | badge xanh *Hợp lệ* / đỏ *Lỗi* |
| Lý do lỗi | text (chỉ dòng lỗi, các lỗi cách bởi `;`) |

**Footer:**
- `[Huỷ]` — đóng Preview, file chưa commit
- **`[Tiếp tục import {X} dòng hợp lệ]`** — disable khi X = 0 (tooltip *"Không có dòng hợp lệ để import. Vui lòng sửa file và upload lại"*)

#### A3.3. Popup Confirm cuối
- Message: *"{X} dòng hợp lệ sẽ được gửi duyệt. {Y} dòng lỗi sẽ bị bỏ qua. Tiếp tục?"*
- `[Quay lại]` · `[Xác nhận]`

---

### A4. Màn Chi tiết đại lý (page riêng)

**URL:** `/dealers/{id}`.

#### Card 1 — Thông tin đại lý (readonly)

| Field | Hiển thị |
| --- | --- |
| Tên đại lý | text |
| SĐT đại lý | text |
| Địa chỉ đại lý | text |
| Tỉnh thành | text |
| Khu vực | text (nhiều KV cách dấu phẩy) |
| Ngày tạo | dd/MM/yyyy |
| Trạng thái | badge |

**Banner đỏ trên đầu Card 1** *(chỉ khi Đã từ chối)*: *"Lý do từ chối: {…} — {thời gian}"*. Banner không có CTA.

#### Card 2 — Tổng số lốp đã mua

⛔ **Out of scope Phase 1 — ẨN HOÀN TOÀN** (chờ module Scheme). Không render placeholder, không render label.

#### Card 3 — Đơn hàng gần đây (Top 10)

| Cột | Mô tả |
| --- | --- |
| Mã đơn | text (không clickable) |
| Số SKU | số |
| Số lốp | số (bold) |
| Ngày | dd/MM/yyyy |
| Trạng thái | badge (Chờ xác nhận / Đã duyệt / Đã từ chối) |

- Sắp xếp: created_at giảm dần
- < 10 đơn → show hết, không pagination
- Empty state: *"Đại lý chưa có đơn hàng nào"*
- Link cuối card: *"Xem tất cả đơn hàng →"* — sang màn Lịch sử đơn hàng filter sẵn theo đại lý này

#### Action bar (header) theo trạng thái

| Trạng thái | Icon hiển thị |
| --- | --- |
| Chờ duyệt | Không có icon |
| Hoạt động | ✎ Sửa · 🔒 Khoá |
| Đã từ chối | ✎ Sửa |
| Đã khoá | 🔓 Mở khoá |

---

### A5. Trang Sửa đại lý (page riêng)

**URL:** `/dealers/{id}/edit`. Trigger từ icon ✎ ở danh sách hoặc Chi tiết.

**Field editable theo trạng thái:**

| Field | Hoạt động | Đã từ chối |
| --- | --- | --- |
| Tên đại lý | ✅ edit | ✅ edit |
| SĐT đại lý | ⛔ readonly | ✅ edit |
| Địa chỉ đại lý | ✅ edit | ✅ edit |
| Tỉnh thành | ✅ edit | ✅ edit |
| Khu vực | ⛔ readonly | ⛔ readonly |

**Field non-editable:** hiển thị readonly với style mờ.

**Action bar:**
- **CTA chính:**
  - Hoạt động → **`[Lưu thay đổi]`**
  - Đã từ chối → **`[Gửi duyệt]`**
- `[Huỷ]` — quay về trang trước (Chi tiết / Danh sách).

**Cancel behavior:**
- Form chưa dirty → click `[Huỷ]` navigate luôn.
- Form đã dirty → popup *"Bạn có chắc muốn huỷ? Thay đổi chưa lưu sẽ mất"*.
- Back button / navigate ra menu khác khi dirty → cùng popup xác nhận.

**Popup confirm trước commit:**
- Hoạt động: *"Cập nhật thông tin đại lý {Tên}? Thay đổi sẽ áp dụng ngay, không cần Kumho duyệt lại"*
- Đã từ chối: *"Gửi duyệt lại đại lý {Tên}? Kumho sẽ nhận thông báo mới và đại lý quay về trạng thái Chờ duyệt"*

**Sau success:** navigate về Chi tiết + toast.

---

### A6. Popup Khoá / Mở khoá

**Trigger:** icon 🔒 / 🔓 ở Action bar Chi tiết đại lý.

**Popup Khoá** *(không nhập lý do)*:
- Message: *"Khoá đại lý {Tên}? Đại lý sẽ không đăng nhập Miniapp và không tạo đơn mới được. Đơn hàng đang Chờ xác nhận của đại lý này bạn vẫn duyệt / từ chối được bình thường"*
- `[Quay lại]` · **`[Xác nhận]`**

**Popup Mở khoá:**
- Message: *"Mở khoá đại lý {Tên}? Đại lý sẽ đăng nhập Miniapp được trở lại ngay, không cần Kumho duyệt lại"*
- `[Quay lại]` · **`[Xác nhận]`**

---

## B. Module NPP — Xác Nhận Đơn Hàng

### B1. Màn Danh sách đơn chờ xác nhận

**Cột bảng:**

| Cột | Mô tả |
| --- | --- |
| Mã đơn | text (vd `DH00128`) |
| Đại lý | tên đại lý |
| Ngày đặt | dd/MM/yyyy |
| Loại lốp | *"3 loại"* nếu nhiều SKU, hoặc tên 1 SKU |
| Tổng SL | số lốp |
| Thao tác | nút **`Xử lý`** |

**Highlight quá hạn:** dòng nền đỏ nhạt + icon ⚠ ở cột Ngày đặt + tooltip *"Đơn hàng đang chờ xử lý quá 24 giờ."* khi chờ > 24h.

**Bộ điều khiển:**
- **Search:** Mã đơn / Tên đại lý
- **Filter:** Đại lý (dropdown), Date range (Ngày đặt từ – đến)
- **Per-page:** 10 / 20 / 50 / 100 (default 10)
- **Sort:** FIFO cố định — Thời điểm gửi đơn cũ nhất trước. Không cho user đổi.

**Sidebar:** badge đỏ realtime = số đơn chờ xác nhận.

**Empty state:** *"Không còn đơn hàng chờ xử lý."* (badge sidebar biến mất).

---

### B2. Màn Chi tiết & Xác nhận đơn

**URL:** `/orders/{id}`. Trigger từ nút `Xử lý` ở danh sách.

#### Card 1 — Thông tin đại lý & đơn hàng (readonly)

- Tên đại lý
- SĐT
- Khu vực
- Mã đơn
- Ngày đặt
- Thời điểm gửi

#### Card 2 — Danh sách lốp đã đặt

**Sub-text trên đầu bảng:** *"Đối chiếu số lượng từng SKU với hoá đơn thực tế. Nếu khớp → Duyệt. Nếu không khớp → Từ chối duyệt và ghi rõ lý do."*

**Cấu trúc cột:**

| Cột | Loại |
| --- | --- |
| # | STT |
| Loại lốp | text *(không có ảnh sản phẩm)* |
| Đại lý nhập | số (readonly) |
| Xác nhận | input số (NPP gõ) |

**Dòng cuối bảng:** **TỔNG SỐ LỐP** (cộng cả 2 cột Đại lý nhập + Xác nhận).

**Hành vi input Xác nhận:**
- Default trống — bắt buộc nhập tất cả SKU.
- Realtime check onChange:
  - Trống → border đỏ + helper text *"Vui lòng nhập số xác nhận"*
  - ≠ Đại lý nhập → border đỏ + icon ⚠ + helper text *"Số lượng SKU xác nhận không khớp với số lượng đại lý khai báo."*
- Validation: số nguyên ≥ 0.

#### Card 3 — Tác động Scheme tích luỹ

Mini-card minh hoạ "nếu duyệt":
- *"Tích luỹ hiện tại: 370/500 lốp (74%)"*
- *"Sẽ cộng thêm nếu duyệt: +28 lốp"*
- *"Tổng sau khi duyệt: 398/500 lốp (79.6%)"* + progress bar

Chỉ cộng khi Duyệt thực sự (Xác nhận khớp Đại lý nhập). Nếu không khớp → card không thay đổi.

#### Action bar (sticky bottom)

- **Warning box amber** phía trên: *"Đơn hàng sau khi duyệt hoặc từ chối sẽ không thể chỉnh sửa. Vui lòng đối chiếu kỹ với hoá đơn thực tế trước khi quyết định."*
- **`[Từ chối duyệt]`** (red outlined) — luôn enable
- **`[Duyệt]`** (solid violet) — enable khi tất cả SKU có Xác nhận khớp Đại lý nhập, disable khi có sai lệch / trống

---

### B3. Popup Confirm Duyệt đơn

- Title: *"Xác nhận duyệt đơn {Mã đơn}"*
- Message: *"Bạn xác nhận duyệt toàn bộ đơn hàng ({Tổng Đại lý nhập} lốp)? Số lốp sẽ được cộng vào tích luỹ Scheme của đại lý."*
- Sub-text: *"ZNS thông báo sẽ được gửi đến đại lý sau khi duyệt thành công."*
- `[Huỷ]` · **`[Xác nhận duyệt]`** (solid violet)
- **Không** đóng được bằng ESC / click ngoài.

---

### B4. Popup Từ chối duyệt đơn

- Title: *"Xác nhận từ chối duyệt đơn {Mã đơn}"*
- **Field:**

| Field | Kiểu | Required | Ràng buộc |
| --- | --- | --- | --- |
| Lý do từ chối duyệt | textarea | ✅ | Min 5 ký tự sau trim, max 255, counter X/255 |

- Sub-text: *"Đại lý sẽ nhận thông báo kèm lý do qua ZNS. Đơn này sẽ đóng vĩnh viễn — đại lý phải nhập đơn mới nếu muốn submit lại."*
- `[Huỷ]` · **`[Xác nhận từ chối duyệt]`** (red solid, disable theo VR)

**Validation messages:**
- Trống → *"Lý do từ chối là bắt buộc"*
- < 5 ký tự → *"Lý do tối thiểu 5 ký tự"*
- > 255 ký tự → counter đỏ + *"Lý do tối đa 255 ký tự"*

---

## C. Module Kumho — Duyệt Đại Lý

### C1. Màn Danh sách đại lý chờ duyệt

**Cột bảng:**

| Cột | Mô tả |
| --- | --- |
| ☐ | Checkbox (header có "chọn cả trang hiện tại") |
| Tên đại lý | text |
| SĐT | text |
| NPP | tên NPP |
| Khu vực | text |
| Tỉnh / Thành phố | text |
| Ngày tạo | dd/MM/yyyy |
| Thao tác | icon **👁 Xem** (tooltip *"Xem chi tiết"*) |

**Highlight quá hạn:** dòng nền đỏ nhạt + icon ⚠ ở cột Ngày tạo + tooltip *"Đại lý đang chờ duyệt quá 48 giờ."* khi chờ > 48h.

**Bulk action bar** (sticky top, ẩn khi chưa chọn dòng nào):
- Text: *"Đã chọn {n} đại lý"*
- **`[Duyệt hàng loạt]`** (solid violet)
- `[Bỏ chọn]` (text link)

**Bộ điều khiển:**
- **Search:** Tên đại lý / SĐT
- **Filter:** NPP, Khu vực, Tỉnh / Thành phố, Date range (Ngày tạo từ – đến)
- **Per-page:** 10 / 20 / 50 / 100 (default 10)
- **Sort:** FIFO cố định — Ngày tạo cũ nhất trước. Không cho user đổi.

**Sidebar:** badge đỏ realtime = số đại lý chờ duyệt.

**Empty state:** *"Không còn đại lý chờ duyệt."* (badge sidebar biến mất).

**Selection KHÔNG persist** qua filter / search / page change / sort → reset toàn bộ tick.

---

### C2. Màn Chi tiết & Duyệt / Từ chối (đơn lẻ)

**URL:** `/kumho/dealers-pending/{id}`. Trigger từ icon 👁 ở danh sách.

#### Card 1 — Thông tin đại lý (readonly)

| Field | Hiển thị |
| --- | --- |
| Tên đại lý | text |
| SĐT | text |
| NPP tạo | tên NPP (clickable sang Chi tiết NPP) |
| Khu vực | text |
| Tỉnh / Thành phố | text |
| Địa chỉ | số nhà + đường + phường/xã |
| Ngày NPP tạo | dd/MM/yyyy |
| Ngày NPP gửi | dd/MM/yyyy hh:mm |

#### Card 2 — Lịch sử Từ chối *(chỉ hiển thị nếu có)*

| Cột | Mô tả |
| --- | --- |
| Lần | STT (1, 2, 3, ...) |
| Thời điểm | dd/MM/yyyy hh:mm |
| Lý do từ chối | text |

Ẩn card nếu đại lý chưa từng bị từ chối.

#### Action bar (sticky bottom)

- **Warning box amber:** *"Sau khi duyệt hoặc từ chối duyệt, trạng thái đại lý không thể chỉnh sửa. Vui lòng đối chiếu kỹ thông tin trước khi quyết định."*
- **`[Từ chối duyệt]`** (red outlined) — luôn enable
- **`[Duyệt]`** (solid violet) — luôn enable

---

### C3. Popup Duyệt đơn lẻ

- Title: *"Xác nhận duyệt đại lý {Tên đại lý}"*
- Message: *"Bạn xác nhận duyệt đại lý này? Đại lý sẽ được kích hoạt Zalo Miniapp và nhận thông tin đăng nhập qua ZNS."*
- Sub-text: *"Sau khi duyệt, trạng thái đại lý sẽ chuyển sang **Hoạt động** và không thể đổi về Chờ duyệt."*
- `[Huỷ]` · **`[Xác nhận duyệt]`** (solid violet)
- **Không** đóng được bằng ESC / click ngoài.
- **Anti-double-click:** sau click → disable nút + spinner đến khi server response.

---

### C4. Popup Từ chối đơn lẻ

- Title: *"Xác nhận từ chối duyệt đại lý {Tên đại lý}"*
- **Field:**

| Field | Kiểu | Required | Ràng buộc |
| --- | --- | --- | --- |
| Lý do từ chối duyệt | textarea | ✅ | Min 5 ký tự sau trim, max 255, counter X/255 |

- Sub-text: *"NPP sẽ thấy lý do từ chối khi vào màn Quản lý đại lý trên Portal. NPP có thể sửa thông tin và gửi duyệt lại — không có giới hạn số lần."*
- `[Huỷ]` · **`[Xác nhận từ chối duyệt]`** (red solid, disable theo VR)

---

### C5. Popup Duyệt Hàng Loạt

**Trigger:** click `[Duyệt hàng loạt]` ở bulk action bar khi đã chọn ≥ 1 dòng.

- Title: *"Xác nhận duyệt {n} đại lý"*
- Message: *"Bạn xác nhận duyệt {n} đại lý đã chọn? Các đại lý này sẽ được kích hoạt Zalo Miniapp và nhận thông tin đăng nhập qua ZNS."*

**Danh sách preview các đại lý được chọn** (scroll nếu > 10 dòng):

| Cột | Mô tả |
| --- | --- |
| Tên đại lý | text |
| SĐT | text |
| NPP | text |
| Khu vực | text |
| Tỉnh / Thành phố | text |

- Sub-text cảnh báo: *"Sau khi duyệt, trạng thái các đại lý sẽ chuyển sang **Hoạt động** và không thể đổi về Chờ duyệt."*
- `[Huỷ]` · **`[Xác nhận duyệt hàng loạt]`** (solid violet)
- **Không** đóng được bằng ESC / click ngoài.
- **Anti-double-click:** disable nút + spinner sau click.

---

### C6. Popup Kết quả Bulk

Hiển thị sau khi server response của Duyệt hàng loạt:

**Case 1 — Tất cả thành công:**
- Toast *"Đã duyệt {n} đại lý"*
- Danh sách reload, badge sidebar giảm {n}, popup đóng

**Case 2 — Partial failure:**
- Popup tổng kết: *"Đã duyệt {x}/{n} đại lý. {y} đại lý không duyệt được."*
- Danh sách đại lý lỗi kèm lý do cụ thể (vd: *"Đã được {Tên Kumho user khác} xử lý lúc {dd/MM/yyyy hh:mm}"*, *"Vượt scope Khu vực phụ trách"*, *"Lỗi hệ thống"*)
- `[Đóng]` → danh sách reload

**Case 3 — Tất cả lỗi:**
- Popup đỏ *"Không duyệt được đại lý nào."*
- Danh sách lý do từng đại lý
- `[Đóng]` → danh sách reload

---

## D. Toast / Notification UI

| Trigger | Toast / Banner |
| --- | --- |
| NPP tạo đại lý thành công | *"Đã tạo đại lý {Tên} — chờ Kumho duyệt"* (auto dismiss 3s) |
| NPP import xong | *"Đã import {X} đại lý — chờ Kumho duyệt"* |
| NPP sửa đại lý Hoạt động | *"Đã cập nhật thông tin đại lý"* |
| NPP resubmit Đã từ chối | *"Đã gửi duyệt lại — chờ Kumho phản hồi"* |
| NPP khoá đại lý | *"Đã khoá đại lý {Tên}"* |
| NPP mở khoá đại lý | *"Đã mở khoá đại lý {Tên}"* |
| NPP duyệt đơn | *"Đã duyệt đơn {Mã đơn}"* |
| NPP từ chối đơn | *"Đã từ chối đơn {Mã đơn}"* |
| Kumho duyệt đại lý đơn lẻ | *"Đã duyệt đại lý {Tên}"* |
| Kumho từ chối đại lý | *"Đã từ chối duyệt đại lý {Tên}"* |
| Kumho duyệt bulk (tất cả OK) | *"Đã duyệt {n} đại lý"* |

---

## E. Component dùng chung

### E.1. Badge trạng thái

**Đại lý** (4 màu):
- Chờ duyệt — xám / vàng
- Hoạt động — xanh lá
- Đã từ chối — đỏ
- Đã khoá — đỏ đậm / xám đen

**Đơn hàng** (3 màu):
- Chờ xác nhận — xám / vàng
- Đã duyệt — xanh lá
- Đã từ chối — đỏ

### E.2. Sidebar badge đỏ realtime
- NPP: số đơn chờ xác nhận
- Kumho: số đại lý chờ duyệt
- Tự ẩn khi = 0

### E.3. Dòng cảnh báo quá hạn
- Đơn chờ > 24h → nền đỏ nhạt + ⚠ + tooltip
- Đại lý chờ duyệt > 48h → nền đỏ nhạt + ⚠ + tooltip

### E.4. Banner lý do từ chối
- Hiện trên đầu Card 1 Chi tiết đại lý (chỉ khi Đã từ chối)
- Nội dung: lý do mới nhất + thời gian
- Không có CTA

### E.5. Warning box amber
- Đặt phía trên Action bar Chi tiết đơn / Chi tiết đại lý duyệt

### E.6. Modal Anti-double-click
- Click confirm → disable nút + loading spinner
- Server error / network fail → re-enable cho retry

### E.7. Popup confirm pattern
- ESC + click ngoài KHÔNG đóng được (cho action có hậu quả lớn: Duyệt / Từ chối)
- Bắt buộc click `[Huỷ]` để đóng
- Footer: `[Huỷ]` (outline) bên trái · CTA chính (solid) bên phải

---

## F. Trạng thái Entity

### F.1. Trạng thái Đại lý

| Code | Trạng thái | Ai set | Hành vi cốt lõi |
| --- | --- | --- | --- |
| `1` | Hoạt động | Kumho duyệt / NPP mở khoá | Đăng nhập Miniapp + tạo đơn được |
| `0` | Đã khoá | NPP khoá | Không đăng nhập, không tạo đơn |
| `2` | Chờ duyệt | NPP tạo / NPP resubmit | Chờ Kumho |
| `3` | Đã từ chối | Kumho từ chối | NPP sửa + gửi lại được |

**State transitions hợp lệ:**

| Từ | Sang | Trigger |
| --- | --- | --- |
| (mới) | Chờ duyệt | NPP tạo (manual / import) |
| Chờ duyệt | Hoạt động | Kumho duyệt |
| Chờ duyệt | Đã từ chối | Kumho từ chối |
| Đã từ chối | Chờ duyệt | NPP sửa + gửi lại |
| Hoạt động | Đã khoá | NPP khoá |
| Đã khoá | Hoạt động | NPP mở khoá |

### F.2. Trạng thái Đơn hàng

| Trạng thái | Mô tả |
| --- | --- |
| Chờ xác nhận | Đại lý gửi qua Miniapp, NPP chưa xử lý |
| Đã duyệt | NPP duyệt → cộng tích luỹ Scheme |
| Đã từ chối | NPP từ chối → đóng vĩnh viễn, không cộng Scheme |

**Đơn Đã duyệt / Đã từ chối = final**, không revert, không sửa.

---

## G. Lưu ý cho Demo Web Tĩnh

1. **Modal vs Page riêng:**
   - **Modal:** Tạo đại lý đơn lẻ (A2), Import upload (A3.1), Preview Import có thể là large modal hoặc full screen (A3.2), tất cả Popup confirm.
   - **Page riêng:** Chi tiết đại lý (A4), Sửa đại lý (A5), Chi tiết đơn (B2), Chi tiết đại lý duyệt (C2).

2. **Form dirty detection cần làm:**
   - Modal Tạo đại lý (A2) — nếu user đã nhập field thì popup confirm khi huỷ.
   - Trang Sửa đại lý (A5) — popup confirm khi click Huỷ / back / navigate.

3. **Realtime onChange validation:**
   - Cột Xác nhận trong Chi tiết đơn (B2) — check khớp với Đại lý nhập mỗi lần gõ.

4. **Bulk selection UX:**
   - Selection không persist qua page / filter / search / sort change (C1).
   - Checkbox header chỉ apply trang hiện tại.

5. **Hidden cho Phase 1:**
   - Card *"Tổng số lốp đã mua"* trên Chi tiết đại lý (A4 — Card 2) ẨN HOÀN TOÀN.
   - Cảnh báo dữ liệu bất thường (trùng tên / địa chỉ) trên list duyệt đại lý của Kumho — chưa làm.

6. **Sort không cho user đổi (FIFO cố định):**
   - Danh sách đơn chờ NPP (B1)
   - Danh sách đại lý chờ duyệt Kumho (C1)
   → Column header KHÔNG có sort interaction.
