package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PendingActions
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenPrimary

@Composable
fun AboutScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        DemoNoticeBanner()

        // Hero Intro
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = AlphaGreenDark)
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color.White.copy(alpha = 0.2f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.School,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "ALPHA - K52",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = "Trạm Giao Dịch Tri Thức & Vật Phẩm Học Tập",
                            fontSize = 11.sp,
                            color = Color(0xFFA7F3D0)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = "Dự án học đường xuất phát từ mong muốn kéo dài vòng đời của sách giáo khoa, tài liệu chuyên sâu, thiết bị máy tính và đồng phục học sinh. Giúp các thế hệ học sinh K52 và khóa kế tiếp tiếp cận nguồn học liệu chất lượng, tiết kiệm chi phí và hình thành nếp sống văn minh, bảo vệ môi trường.",
                    fontSize = 12.sp,
                    color = Color(0xFFF1F5F9),
                    lineHeight = 17.sp
                )
            }
        }

        // Section: Những chức năng ĐÃ HOẠT ĐỘNG
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = Color(0xFF16A34A),
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Các chức năng ĐÃ HOẠT ĐỘNG (Bản chạy thử)",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                ActiveFeatureItem(
                    title = "Trang chủ & Danh mục vật phẩm trực quan",
                    desc = "Giới thiệu trạm K52, số liệu tác động xanh, carousel nhóm hàng và danh sách vật phẩm nổi bật."
                )

                ActiveFeatureItem(
                    title = "Kho vật phẩm & Bộ lọc đa tiêu chí",
                    desc = "Tìm kiếm theo từ khóa tên sách, lọc theo Khối lớp (10-12), lọc theo Môn học, lọc theo Giá và Hình thức giao dịch (Bán, Thuê, Tặng, Đổi, Ký gửi)."
                )

                ActiveFeatureItem(
                    title = "Thêm vật phẩm trực tiếp vào kho",
                    desc = "Cấp mã duy nhất (VD: K52-SGK-01), tình trạng, giá bán, giá thuê, ô tủ vị trí tại trạm và biệt danh chủ sở hữu."
                )

                ActiveFeatureItem(
                    title = "Biểu mẫu đăng ký 6 hình thức",
                    desc = "Học sinh đăng ký Bán, Mua/Tìm, Thuê, Tặng 0đ, Đổi hoặc Ký gửi. Hệ thống chuyển vào hàng chờ duyệt."
                )

                ActiveFeatureItem(
                    title = "Trang quản trị & Phân quyền bảo mật",
                    desc = "Xác thực mã PIN quản trị (Demo: 1234). Duyệt yêu cầu nhập kho, Xuất kho bàn giao đồ, Nhận trả đồ sau thuê/mượn và tự động ghi nhật ký giao dịch."
                )

                ActiveFeatureItem(
                    title = "Bảng theo dõi giao dịch & Thống kê tái sử dụng",
                    desc = "Thống kê vòng đời tái sử dụng của sách vở, ước tính số tiền học sinh tiết kiệm được và nhật ký giao dịch toàn hệ thống (Audit Logs)."
                )

                ActiveFeatureItem(
                    title = "Bộ sinh mã QR Canvas tự động",
                    desc = "Tạo mã QR ma trận chuẩn chỉ chứa DUY NHẤT mã vật phẩm, TUYỆT ĐỐI KHÔNG chứa thông tin cá nhân (SĐT, tên học sinh) để dán nhãn tủ đồ an toàn."
                )
            }
        }

        // Section: Những chức năng CẦN HOÀN THIỆN TIẾP THEO
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.PendingActions,
                        contentDescription = null,
                        tint = Color(0xFFEA580C),
                        modifier = Modifier.size(22.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Các chức năng CẦN HOÀN THIỆN TIẾP THEO",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                PendingFeatureItem(
                    title = "Cơ sở dữ liệu đám mây thực tế & Đồng bộ realtime",
                    desc = "Hiện tại sử dụng dữ liệu mẫu có nhãn DEMO trong bộ nhớ. Phiên bản chính thức sẽ kết nối Firestore/PostgreSQL để lưu trữ vĩnh viễn trên máy chủ."
                )

                PendingFeatureItem(
                    title = "Đăng nhập xác thực qua Email trường / Google Workspace",
                    desc = "Kết nối SSO học sinh trường để phân quyền tự động theo lớp học và đảm bảo danh tính nội bộ an toàn."
                )

                PendingFeatureItem(
                    title = "Tải ảnh thật của vật phẩm từ camera máy ảnh",
                    desc = "Tích hợp thư viện Camera/Image Picker để học sinh chụp trực tiếp tình trạng trang sách hay thiết bị trước khi gửi."
                )

                PendingFeatureItem(
                    title = "Quét mã QR bằng Camera trực tiếp",
                    desc = "Tích hợp CameraX quét nhanh tem QR trên gáy sách khi nhận trả đồ tại tủ trạm."
                )

                PendingFeatureItem(
                    title = "Tích hợp Điểm thưởng / Alpha Coin (phiên bản sau)",
                    desc = "Theo yêu cầu người dùng, phiên bản hiện tại CHƯA cần Alpha Coin hay thanh toán online; tương lai có thể tích lũy điểm xanh đổi quà."
                )
            }
        }

        // Security Commitment Card
        Surface(
            color = Color(0xFFF0FDF4),
            shape = RoundedCornerShape(12.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(14.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = null,
                    tint = AlphaGreenPrimary,
                    modifier = Modifier.size(26.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Quy chuẩn Bảo Mật & Minh Bạch:",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF166534)
                    )
                    Text(
                        text = "Hệ thống thể hiện rõ ràng đây là bản demo thử nghiệm, không giả vờ dữ liệu đã được lưu an toàn. Dữ liệu học sinh chỉ dùng bí danh ẩn danh hóa.",
                        fontSize = 11.sp,
                        color = Color(0xFF14532D),
                        lineHeight = 15.sp
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

@Composable
private fun ActiveFeatureItem(title: String, desc: String) {
    Column(modifier = Modifier.padding(vertical = 5.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF16A34A), modifier = Modifier.size(15.dp))
            Spacer(modifier = Modifier.width(6.dp))
            Text(text = title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E293B))
        }
        Text(
            text = desc,
            fontSize = 11.sp,
            color = Color(0xFF64748B),
            modifier = Modifier.padding(start = 21.dp)
        )
    }
}

@Composable
private fun PendingFeatureItem(title: String, desc: String) {
    Column(modifier = Modifier.padding(vertical = 5.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.PendingActions, contentDescription = null, tint = Color(0xFFEA580C), modifier = Modifier.size(15.dp))
            Spacer(modifier = Modifier.width(6.dp))
            Text(text = title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E293B))
        }
        Text(
            text = desc,
            fontSize = 11.sp,
            color = Color(0xFF64748B),
            modifier = Modifier.padding(start = 21.dp)
        )
    }
}
