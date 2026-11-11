const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory order storage
const ordersDB = [];

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'La Petite Vienne Backend Service is running' });
});

// API Route: Submit Order (POST /api/orders)
app.post('/api/orders', (req, res) => {
  try {
    const { 
      customerInfo, 
      cart, 
      deliveryMethod, 
      selectedTimeSlot, 
      selectedDistrict, 
      shippingFee, 
      subtotal, 
      finalTotal 
    } = req.body;

    // Basic Validation
    if (!customerInfo || !customerInfo.name || !customerInfo.phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Trường thông tin Họ tên và Số điện thoại là bắt buộc.' 
      });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Giỏ hàng không có sản phẩm nào.' 
      });
    }

    // Generate Unique Order Code (Format: LPV-YYYYMMDD-XXXX)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `LPV-${dateStr}-${randomNum}`;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerInfo,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        flagText: item.flagText || 'Không có',
        itemTotal: item.price * item.qty
      })),
      deliveryMethod, // 'delivery' | 'pickup'
      selectedTimeSlot,
      selectedDistrict: deliveryMethod === 'delivery' ? selectedDistrict : 'N/A (Tự lấy)',
      shippingFee,
      subtotal,
      finalTotal,
      status: 'PENDING_CONFIRMATION'
    };

    ordersDB.push(newOrder);

    console.log(`[ĐƠN HÀNG MỚI] ${orderId} - Khách: ${customerInfo.name} (${customerInfo.phone}) - Tổng: ${finalTotal.toLocaleString('vi-VN')} VNĐ`);

    return res.status(201).json({
      success: true,
      message: 'Yêu cầu đặt bánh đã được gửi thành công!',
      orderId,
      orderDetails: newOrder
    });

  } catch (error) {
    console.error('Lỗi xử lý đơn hàng:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi máy chủ xảy ra. Vui lòng thử lại sau.' 
    });
  }
});

// API Route: Get All Orders (GET /api/orders - For Admin/Kitchen)
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    totalOrders: ordersDB.length,
    orders: ordersDB
  });
});

// API Route: Get Order Detail by ID (GET /api/orders/:orderId)
app.get('/api/orders/:orderId', (req, res) => {
  const order = ordersDB.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  res.json({ success: true, order });
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`  LA PETITE VIENNE BACKEND API IS RUNNING`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`================================================`);
});