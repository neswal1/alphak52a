package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AdminPanelSettings
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.RequestStatus
import com.example.model.UserRole
import com.example.ui.components.AddItemDialog
import com.example.ui.components.ItemDetailDialog
import com.example.ui.components.QrDisplayDialog
import com.example.ui.components.RoleSwitcherBar
import com.example.ui.screens.AboutScreen
import com.example.ui.screens.AdminManagementScreen
import com.example.ui.screens.HomeScreen
import com.example.ui.screens.RegisterFormScreen
import com.example.ui.screens.StatisticsAndHistoryScreen
import com.example.ui.screens.WarehouseScreen
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary
import com.example.ui.theme.MyApplicationTheme
import com.example.viewmodel.AlphaK52ViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: AlphaK52ViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                AlphaK52App(viewModel = viewModel)
            }
        }
    }
}

sealed class NavDestination(val title: String, val icon: ImageVector) {
    object Home : NavDestination("Trang chủ", Icons.Default.Home)
    object Warehouse : NavDestination("Kho đồ", Icons.Default.Inventory2)
    object Register : NavDestination("Đăng ký", Icons.Default.Assignment)
    object Admin : NavDestination("Quản trị", Icons.Default.AdminPanelSettings)
    object Stats : NavDestination("Thống kê", Icons.Default.BarChart)
    object About : NavDestination("Giới thiệu", Icons.Default.Info)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlphaK52App(viewModel: AlphaK52ViewModel) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var currentNavIndex by remember { mutableIntStateOf(0) }
    val snackbarHostState = remember { SnackbarHostState() }

    var showAddItemDialog by remember { mutableStateOf(false) }

    val destinations = listOf(
        NavDestination.Home,
        NavDestination.Warehouse,
        NavDestination.Register,
        NavDestination.Admin,
        NavDestination.Stats,
        NavDestination.About
    )

    // Show toast / snackbar on notification message
    LaunchedEffect(uiState.notificationMessage) {
        val msg = uiState.notificationMessage
        if (msg != null) {
            snackbarHostState.showSnackbar(msg)
            viewModel.dismissNotification()
        }
    }

    val pendingRequestsCount = uiState.requests.count { it.status == RequestStatus.PENDING }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
            Surface(
                color = Color.White,
                shadowElevation = 2.dp,
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 36.dp, bottom = 8.dp, start = 16.dp, end = 16.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(34.dp)
                                    .background(AlphaGreenPrimary, CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Default.School,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(8.dp))
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = "ALPHA - K52",
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 16.sp,
                                        color = AlphaGreenDark
                                    )
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Surface(
                                        color = Color(0xFFFEF3C7),
                                        shape = RoundedCornerShape(4.dp),
                                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFFCD34D))
                                    ) {
                                        Text(
                                            text = "DEMO",
                                            fontSize = 9.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = Color(0xFF92400E),
                                            modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                                        )
                                    }
                                }
                                Text(
                                    text = "Trạm Giao Dịch Tri Thức & Vật Phẩm",
                                    fontSize = 11.sp,
                                    color = Color(0xFF64748B)
                                )
                            }
                        }

                        // Role badge toggle button
                        Surface(
                            modifier = Modifier.clickable {
                                if (uiState.currentRole == UserRole.ADMIN) {
                                    viewModel.switchRole(UserRole.STUDENT)
                                } else {
                                    currentNavIndex = 3 // Jump to Admin tab to trigger pin authorization
                                }
                            },
                            color = if (uiState.currentRole == UserRole.ADMIN) Color(0xFFFEF2F2) else AlphaGreenContainer,
                            shape = RoundedCornerShape(20.dp),
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (uiState.currentRole == UserRole.ADMIN) Color(0xFFFECACA) else Color(0xFFA7F3D0)
                            )
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = if (uiState.currentRole == UserRole.ADMIN) Icons.Default.AdminPanelSettings else Icons.Default.Person,
                                    contentDescription = null,
                                    tint = if (uiState.currentRole == UserRole.ADMIN) Color(0xFFDC2626) else AlphaGreenPrimary,
                                    modifier = Modifier.size(14.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = if (uiState.currentRole == UserRole.ADMIN) "Quản trị Kho" else "Học sinh",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (uiState.currentRole == UserRole.ADMIN) Color(0xFFDC2626) else AlphaGreenDark
                                )
                            }
                        }
                    }
                }
            }
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 6.dp,
                modifier = Modifier.height(64.dp)
            ) {
                destinations.forEachIndexed { index, dest ->
                    val isSelected = currentNavIndex == index
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentNavIndex = index },
                        icon = {
                            if (dest == NavDestination.Admin && pendingRequestsCount > 0) {
                                BadgedBox(
                                    badge = {
                                        Badge(containerColor = Color(0xFFDC2626)) {
                                            Text("$pendingRequestsCount")
                                        }
                                    }
                                ) {
                                    Icon(dest.icon, contentDescription = dest.title, modifier = Modifier.size(20.dp))
                                }
                            } else {
                                Icon(dest.icon, contentDescription = dest.title, modifier = Modifier.size(20.dp))
                            }
                        },
                        label = {
                            Text(
                                text = dest.title,
                                fontSize = 10.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AlphaGreenPrimary,
                            selectedTextColor = AlphaGreenPrimary,
                            unselectedIconColor = Color(0xFF64748B),
                            unselectedTextColor = Color(0xFF64748B),
                            indicatorColor = AlphaGreenContainer
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFF7FBF8))
        ) {
            when (currentNavIndex) {
                0 -> HomeScreen(
                    items = uiState.items,
                    onNavigateToWarehouse = { currentNavIndex = 1 },
                    onNavigateToRegister = { currentNavIndex = 2 },
                    onSelectCategory = { cat ->
                        viewModel.updateCategoryFilter(cat)
                    },
                    onViewDetail = { item -> viewModel.showItemDetail(item) },
                    onShowQr = { item -> viewModel.showQrForItem(item) }
                )
                1 -> WarehouseScreen(
                    items = viewModel.getFilteredItems(),
                    filterState = uiState.filter,
                    currentRole = uiState.currentRole,
                    onSearchChange = { viewModel.updateSearchQuery(it) },
                    onCategoryChange = { viewModel.updateCategoryFilter(it) },
                    onGradeChange = { viewModel.updateGradeFilter(it) },
                    onTransactionTypeChange = { viewModel.updateTransactionTypeFilter(it) },
                    onToggleFreeOnly = { viewModel.toggleOnlyGiftOrFree(it) },
                    onToggleAvailableOnly = { viewModel.toggleOnlyAvailable(it) },
                    onResetFilters = { viewModel.resetFilters() },
                    onViewDetail = { item -> viewModel.showItemDetail(item) },
                    onShowQr = { item -> viewModel.showQrForItem(item) },
                    onOpenAddDialog = { showAddItemDialog = true }
                )
                2 -> RegisterFormScreen(
                    onSubmitRequest = { type, name, cat, grade, sub, cond, price, rent, qty, notes, alias ->
                        viewModel.submitRegistrationRequest(
                            transactionType = type,
                            itemName = name,
                            category = cat,
                            gradeLevel = grade,
                            subject = sub,
                            condition = cond,
                            proposedPrice = price,
                            proposedRentPrice = rent,
                            quantity = qty,
                            notes = notes,
                            studentAlias = alias
                        )
                    }
                )
                3 -> AdminManagementScreen(
                    currentRole = uiState.currentRole,
                    items = uiState.items,
                    requests = uiState.requests,
                    logs = uiState.logs,
                    onAuthenticateAdmin = { pin -> viewModel.switchRole(UserRole.ADMIN, pin) },
                    onApproveRequest = { reqId, locker -> viewModel.approveRequest(reqId, locker) },
                    onRejectRequest = { reqId, reason -> viewModel.rejectRequest(reqId, reason) },
                    onHandoverItem = { code, recipient, notes -> viewModel.handoverItem(code, recipient, notes) },
                    onReturnItem = { code, cond, locker, notes -> viewModel.returnItem(code, cond, locker, notes) },
                    onOpenAddItemDialog = { showAddItemDialog = true },
                    onShowQr = { item -> viewModel.showQrForItem(item) }
                )
                4 -> StatisticsAndHistoryScreen(
                    items = uiState.items,
                    logs = uiState.logs
                )
                5 -> AboutScreen()
            }
        }
    }

    // Modal: QR Code display
    if (uiState.selectedItemForQr != null) {
        QrDisplayDialog(
            item = uiState.selectedItemForQr!!,
            onDismiss = { viewModel.closeQrDialog() }
        )
    }

    // Modal: Item Details
    if (uiState.selectedItemForDetail != null) {
        ItemDetailDialog(
            item = uiState.selectedItemForDetail!!,
            currentRole = uiState.currentRole,
            onDismiss = { viewModel.closeItemDetail() },
            onShowQr = { item -> viewModel.showQrForItem(item) },
            onReserve = { code, alias -> viewModel.reserveItem(code, alias) },
            onHandover = { code, recipient, notes -> viewModel.handoverItem(code, recipient, notes) },
            onReturn = { code, cond, locker, notes -> viewModel.returnItem(code, cond, locker, notes) }
        )
    }

    // Modal: Add Item Directly to Warehouse
    if (showAddItemDialog) {
        AddItemDialog(
            onDismiss = { showAddItemDialog = false },
            onAddItem = { code, name, cat, grade, sub, cond, owner, price, rent, qty, type, notes, locker ->
                viewModel.addItemDirectly(
                    code = code,
                    name = name,
                    category = cat,
                    gradeLevel = grade,
                    subject = sub,
                    condition = cond,
                    ownerAlias = owner,
                    price = price,
                    rentPricePerWeek = rent,
                    quantity = qty,
                    transactionType = type,
                    notes = notes,
                    stationLocker = locker
                )
            }
        )
    }
}
