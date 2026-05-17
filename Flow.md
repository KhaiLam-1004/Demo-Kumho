'User flow — CMS Kumho (Portal)

- B1: Admin nội bộ gotit import danh sách NPP từ file Excel của Kumho 
      → hệ thống tự tạo tài khoản và gửi ZNS thông báo mật khẩu mặc 
      định cho NPP
- B2: NPP click link trong ZNS → đăng nhập portal lần đầu bằng SĐT + 
      mật khẩu mặc định → bắt buộc đổi mật khẩu mới
- B3: NPP tạo đại lý đơn lẻ (form 4 fields) hoặc import hàng loạt 
      (Excel) → hệ thống tự gửi email cho Kumho yêu cầu duyệt
- B4: Kumho đăng nhập portal → vào trang "Đại lý chờ duyệt" → 
      thực hiện duyệt:
      + Cách 1: Duyệt nhanh inline từ list (1 đại lý) hoặc bulk 
        (nhiều đại lý cùng lúc)
      + Cách 2: Vào chi tiết để review kỹ rồi duyệt/từ chối
      → Nếu duyệt: ZNS gửi đại lý kèm link miniapp
      → Nếu từ chối: ZNS gửi NPP kèm lý do từ chối
- B5: Đại lý nhập đơn hàng đã mua qua Zalo Miniapp → hệ thống gửi 
      ZNS cho NPP báo có đơn cần xác nhận
- B6: NPP vào portal → "Đơn hàng cần xác nhận" → đối chiếu hoá đơn 
      thực tế với thông tin đại lý nhập:
      + Đơn multi-SKU: NPP có thể xác nhận từng dòng SKU riêng 
        (chỉnh số lượng từng loại lốp)
      + Xác nhận đơn hàng  / Từ chối đơn hàng
- B7: Hệ thống tự tính tích luỹ theo scheme (Campaign tool). Khi đại 
      lý đạt mục tiêu (500 lốp/3 tháng):
      + ZNS gửi đại lý chúc mừng + thông tin quà thưởng
      + Kumho/NPP thấy đại lý đạt scheme ở "Lịch sử trả quà"
      + Kumho liên hệ giao quà thực tế 

User flow — Zalo Miniapp (Đại lý)

- B1: Đại lý nhận ZNS thông báo "Tài khoản đã được duyệt" → 
      click CTA trong ZNS → mở Zalo Miniapp Kumho Campaign
- B2: Đại lý sau khi mua lốp từ NPP (offline) → vào miniapp nhập 
      thông tin đơn hàng đã mua:
      + Form: Ngày đặt đơn + danh sách lốp multi-SKU (loại lốp 
        dropdown + số lượng) + NPP (readonly)
      + Có thể "+ Thêm loại lốp" nhiều dòng trong 1 đơn
      + Gửi xác nhận → NPP nhận thông báo
      + Theo dõi trạng thái: Chờ xác nhận / Đã xác nhận / Đã từ chối (xem lý do)
      + Khi đạt scheme: ZNS thông báo chúc mừng → trang "Quà của tôi"