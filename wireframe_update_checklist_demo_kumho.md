# Wireframe Update Checklist — Demo Kumho

> **Mục tiêu:** đồng bộ wireframe demo Kumho với 2 BRD đã update mới:
> - [Quản lý đại lý — merged module](kumho_CMS_dealer_management_business_rules.md) (v1.2)
> - [Quản lý đơn hàng](kumho_CMS_npp_order_management_business_rules.md) (v1.3)
>
> **Affected wireframe specs:**
> - [screen-specs/03_Kumho_Screens.md](screen-specs/03_Kumho_Screens.md)
> - [screen-specs/04_NPP_Screens.md](screen-specs/04_NPP_Screens.md)

---

## A. Module Quản lý đại lý

### A.1. Sidebar entry — gộp 2 entry thành 1 (CRITICAL)

Hiện 2 entry riêng (*Duyệt đại lý* + *Quản lý đại lý*) → **gộp thành 1 entry "Quản lý đại lý" với 2 tab cấp 1**:

- Tab **"Danh sách đại lý"** — cả 2 role (NPP + Kumho)
- Tab **"Duyệt đại lý"** — chỉ Kumho (default khi Kumho mở module)

**Affected:** sidebar [03_Kumho_Screens.md:1-20](screen-specs/03_Kumho_Screens.md) + [04_NPP_Screens.md:9](screen-specs/04_NPP_Screens.md#L9).

### A.2. Tab "Danh sách đại lý" — merge 2 spec cũ (CRITICAL)

**Merge** [SCREEN-KUMHO-07](screen-specs/03_Kumho_Screens.md#L432) ("Quản lý Đại lý toàn HT") + [SCREEN-NPP-01](screen-specs/04_NPP_Screens.md#L9) ("Quản lý Đại lý") → **1 wireframe chung**.

**Đặc trưng chung:**
- Bảng 4 trạng thái + **dropdown filter Trạng thái** (KHÔNG có sub-tab theo trạng thái).
- Sort cố định **Ngày tạo giảm dần**.

**Phân biệt theo role:**

| Element | NPP | Kumho |
|---|---|---|
| Header | *[+ Tạo đại lý mới]* · *[Import từ Excel]* | (không có) |
| Filter | Tỉnh thành · Trạng thái | NPP · Khu vực · Tỉnh thành · Trạng thái |
| Cột bảng | Tên / SĐT / Tỉnh / Khu vực / Trạng thái / Ngày tạo / Thao tác | Tên / SĐT / **NPP** / Khu vực / Tỉnh / Trạng thái / Ngày tạo / Thao tác |
| Cột Thao tác | 👁 (luôn) + ✎ (Hoạt động / Đã từ chối) | 👁 (luôn) — không có ✎ |
| Checkbox | Không có | Không có (checkbox bulk chỉ ở tab *Duyệt đại lý*) |

### A.3. Tab "Duyệt đại lý" (chỉ Kumho) — FIX nhỏ

[SCREEN-KUMHO-01](screen-specs/03_Kumho_Screens.md#L9) đã gần đúng. **Chỉ cần fix:**

- **Sort Ngày gửi** (dòng ~64): hiện `desc` → đổi thành **`asc`** (đại lý gửi sớm nhất xếp đầu — đại lý chờ lâu nhất ở trên cùng).

**Verify đầy đủ:**
- Chỉ đại lý *Chờ duyệt* trong scope khu vực.
- Filter: NPP / Khu vực / Tỉnh / Khoảng ngày (Ngày NPP gửi).
- Highlight đỏ + icon ⚠ cho dòng > 48h.
- Checkbox bulk approve → thanh thao tác hàng loạt → *[Duyệt hàng loạt]*.
- Sidebar badge = count đại lý ở tab này.

### A.4. Trang Chi tiết đại lý — merge 3 spec cũ (CRITICAL)

**Merge** [SCREEN-KUMHO-02](screen-specs/03_Kumho_Screens.md#L125) (chi tiết Chờ duyệt) + [SCREEN-KUMHO-08](screen-specs/03_Kumho_Screens.md#L478) (chi tiết view-only) + [SCREEN-NPP-04](screen-specs/04_NPP_Screens.md#L233) (chi tiết NPP) → **1 page chung** `/dealers/{id}`.

**Layout:**
- **Card 4.1 Thông tin đại lý** (readonly): Tên, SĐT, NPP tạo, Khu vực, Tỉnh, Địa chỉ, Ngày NPP tạo, Ngày NPP gửi, Trạng thái.
- **Banner lý do từ chối mới nhất** — chỉ khi *Đã từ chối* (cả 2 role thấy).
- **Card 4.2 Đơn hàng gần đây** — top 10 đơn, readonly, link *"Xem tất cả đơn hàng →"* sang module *Quản lý đơn hàng*.

**Action bar theo role + trạng thái:**

| Trạng thái | NPP | Kumho |
|---|---|---|
| Chờ duyệt | (trống) | *[Duyệt]* + *[Từ chối duyệt]* |
| Hoạt động | ✎ Sửa · 🔒 Khoá | (trống) — readonly |
| Đã từ chối | ✎ Sửa | (trống) — readonly |
| Đã khoá | 🔓 Mở khoá | (trống) — readonly |

**Xoá hẳn nếu wireframe cũ có:**
- ❌ **Card Lịch sử từ chối duyệt** (BRD v1.2 đã bỏ — hệ thống chỉ ghi đè lý do mới nhất, không lưu history).
- ❌ **Card Tổng số lốp đã mua** (out of scope Phase 1).

### A.5. Trang Sửa đại lý — wireframe MỚI cần vẽ (WARNING)

Hiện **chưa có spec**. BRD v1.2 yêu cầu:

- **Page riêng** URL `/dealers/{id}/edit` (KHÔNG phải modal, không phải inline edit ở Chi tiết).
- Chỉ NPP, chỉ truy cập được khi trạng thái Hoạt động / Đã từ chối.
- Form pre-fill data hiện tại. Field editable theo trạng thái:

| Trường | Hoạt động (editable) | Đã từ chối (editable) |
|---|---|---|
| Tên đại lý | ✓ | ✓ |
| SĐT | ✗ readonly mờ | ✓ |
| Địa chỉ | ✓ | ✓ |
| Tỉnh thành | ✓ | ✓ |
| Khu vực | ✗ readonly mờ | ✗ readonly mờ |

- **CTA:** *[Lưu thay đổi]* (Hoạt động) hoặc *[Gửi duyệt]* (Đã từ chối) + *[Huỷ]*.
- Popup confirm trước commit. Popup confirm khi cancel dirty form.

### A.6. Modal Tạo đại lý + Popup Import Excel (VERIFY)

Verify có spec đầy đủ (nếu chưa có thì vẽ mới):

**Modal Tạo manual:**
- Field: Tên, SĐT, Địa chỉ, Tỉnh thành, **Khu vực** (multi-select dropdown — options = subset Khu vực NPP).
- NPP có 1 Khu vực → dropdown mặc định chọn + disabled.
- CTA: *[Gửi duyệt]* + *[Huỷ]* (popup confirm nếu đã nhập ≥ 1 field).
- Inline error theo VR-021..024 (SĐT format, trùng của mình, trùng NPP khác, Khu vực).

**Popup Import Excel:**
- Upload `.xlsx` (≤ 5MB, ≤ 500 dòng).
- Link tải template mẫu.
- File-level lỗi → reject với wording cụ thể.

**Màn Preview Import** (sau khi upload pass file-level):
- Header thống kê: *"Tổng Z dòng — X hợp lệ — Y lỗi"*.
- Tab filter: *Tất cả* / *Hợp lệ* / *Lỗi* (default *Lỗi* nếu Y > 0).
- Bảng dữ liệu + cột *Trạng thái* (badge Hợp lệ/Lỗi) + cột *Lý do lỗi*.
- CTA: *[Tiếp tục import X dòng hợp lệ]* (disabled khi X = 0) + *[Huỷ]*.
- Popup confirm cuối trước khi commit.

---

## B. Module Quản lý đơn hàng

### B.1. Tab filter cho Kumho — rewrite (CRITICAL)

[SCREEN-KUMHO-09](screen-specs/03_Kumho_Screens.md#L506) hiện dùng layout filter dạng columns → **rewrite thành tab + dropdown NPP**:

- **3 tab cho Kumho**: *Tất cả* (default) / *Đã xác nhận* / *Đã từ chối* — **KHÔNG có tab *Chờ xác nhận*** (Kumho không xử lý đơn; đơn pending vẫn xuất hiện ở tab *Tất cả* để giám sát).
- **Dropdown NPP** trên thanh filter (chỉ list NPP trong khu vực phụ trách Kumho user).
- **Không có sidebar badge** đơn Chờ xác nhận cho Kumho.

### B.2. Tab filter cho NPP — verify

[SCREEN-NPP-05](screen-specs/04_NPP_Screens.md#L324) + [SCREEN-NPP-07](screen-specs/04_NPP_Screens.md#L530): verify đầy đủ:

- 4 tab theo thứ tự: *Tất cả* / *Chờ xác nhận* (**default**) / *Đã xác nhận* / *Đã từ chối*.
- **Sidebar badge** count đơn *Chờ xác nhận* (> 99 → *"99+"*; = 0 → ẩn).

### B.3. Cột bảng — FIX

**NPP** ([SCREEN-NPP-05](screen-specs/04_NPP_Screens.md#L355)): thêm cột:
- *Ngày xử lý* (đơn Chờ xác nhận hiển thị `"—"`).
- *Trạng thái* (pill).
- **Highlight cảnh báo > 24h**: đơn *Chờ xác nhận* > 24h → dòng highlight + icon ⚠ + tooltip *"Đơn hàng đang chờ xử lý quá 24 giờ."*.

**Kumho**: thêm cột **NPP** (tên NPP chủ quản đại lý) — sau cột *Đại lý*.

**Sort theo tab** (cố định, user không đổi):

| Tab | Sort default | Tie-breaker |
|---|---|---|
| Tất cả | Ngày đặt **desc** | Mã đơn desc |
| Chờ xác nhận | Ngày đặt **asc** (FIFO — đơn cũ nhất ở đầu, ép xử lý theo thứ tự) | Mã đơn asc |
| Đã xác nhận / Đã từ chối | Ngày xử lý **desc** | Mã đơn desc |

### B.4. Trang chi tiết đơn — Kumho readonly mode (verify)

[SCREEN-KUMHO-10](screen-specs/03_Kumho_Screens.md#L580): verify khi Kumho mở đơn *Chờ xác nhận*:
- **Banner** *"Đơn đang chờ NPP xử lý"* ở đầu trang.
- **Không có nút** Duyệt / Từ chối duyệt.
- **Không có input** cột *Xác nhận* (readonly toàn bộ cột).

**Card Tác động Scheme** theo trạng thái:

| Status đơn | Card Scheme |
|---|---|
| Chờ xác nhận | Preview "nếu duyệt" — tích luỹ hiện tại + số lốp sẽ cộng thêm + tổng sau duyệt + progress bar |
| Đã xác nhận | Snapshot tại thời điểm duyệt |
| Đã từ chối | **Ẩn card** (đơn từ chối không cộng tích luỹ) |

**Card Thông tin xử lý** (chỉ đơn đã xử lý): Thời điểm xử lý / Quyết định / Lý do từ chối (chỉ khi Đã từ chối). Đơn Chờ xác nhận → ẩn card.

### B.5. Xuất Excel — verify cột NPP cho Kumho

- **NPP** file Excel: 15 cột (giữ nguyên).
- **Kumho** file Excel: **16 cột** — thêm cột *NPP* (tên NPP chủ quản) chèn ngay sau cột *Mã đơn*.

**Tên file:**
- NPP: `quan_ly_don_hang_{tên_NPP}_{yyyyMMdd_HHmmss}.xlsx`
- Kumho: `quan_ly_don_hang_kumho_{tên_NPP_filter | "tat_ca"}_{yyyyMMdd_HHmmss}.xlsx`

---

## C. Tổng kết action

| # | Việc | Mức | File / Screen |
|---|---|---|---|
| 1 | Gộp sidebar 2 entry *Duyệt đại lý* + *Quản lý đại lý* → 1 entry với 2 tab | CRITICAL | sidebar layout (cả 2 file) |
| 2 | Merge SCREEN-KUMHO-07 + SCREEN-NPP-01 → 1 wireframe tab *Danh sách đại lý* | CRITICAL | KUMHO-07 + NPP-01 |
| 3 | Merge SCREEN-KUMHO-02 + 08 + SCREEN-NPP-04 → 1 page Chi tiết `/dealers/{id}` | CRITICAL | KUMHO-02/08 + NPP-04 |
| 4 | Xoá Card *Lịch sử từ chối* + Card *Tổng số lốp* khỏi Chi tiết | CRITICAL | KUMHO-02/08 + NPP-04 |
| 5 | Vẽ mới trang Sửa đại lý `/dealers/{id}/edit` (NPP only) | WARNING | mới |
| 6 | Verify modal Tạo đại lý manual + Popup Import + Preview | VERIFY | NPP-03 (nếu có) |
| 7 | Rewrite SCREEN-KUMHO-09 từ filter layout → 3 tab + dropdown NPP | CRITICAL | KUMHO-09 |
| 8 | SCREEN-KUMHO-01: đổi sort Ngày gửi `desc` → `asc` (đại lý gửi sớm nhất xếp đầu) | FIX | KUMHO-01 line ~64 |
| 9 | SCREEN-NPP-05: thêm cột Ngày xử lý + Trạng thái + cảnh báo highlight 24h | FIX | NPP-05 |
| 10 | Verify SCREEN-NPP-05/07 default tab *Chờ xác nhận* + sidebar badge NPP | VERIFY | NPP-05/07 |
| 11 | Verify SCREEN-KUMHO-10 banner *"Đơn đang chờ NPP xử lý"* + Card Scheme ẩn khi Đã từ chối | VERIFY | KUMHO-10 |
| 12 | Verify file Excel Kumho có cột *NPP* + tên file prefix `quan_ly_don_hang_kumho_...` | VERIFY | KUMHO-09 export spec |

---

## D. References

- BRD đã update:
  - [Quản lý đại lý (merged)](kumho_CMS_dealer_management_business_rules.md) — v1.2
  - [Quản lý đơn hàng](kumho_CMS_npp_order_management_business_rules.md) — v1.3
- Screen specs hiện tại:
  - [03_Kumho_Screens.md](screen-specs/03_Kumho_Screens.md)
  - [04_NPP_Screens.md](screen-specs/04_NPP_Screens.md)
  - [00_INDEX.md](screen-specs/00_INDEX.md)
- BRD docs cũ (đã merge — giữ để reference):
  - [Quản lý đại lý NPP (cũ)](kumho_CMS_npp_dealer_business_rules.md)
  - [Duyệt đại lý Kumho (cũ)](kumho_CMS_kumho_dealer_approval_business_rules.md)
