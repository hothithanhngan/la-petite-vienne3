import React, { useState } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Calendar, Clock, 
  MapPin, Truck, ChevronDown, ChevronUp, Check, Info, Tag
} from 'lucide-react';

const PRODUCTS_DATA = [
  // --- CỤM 1: BÁNH CÓ SẴN (20 MÓN: CS-01 đến CS-20) ---
  {
    id: 'CS-01', category: 'CS', name: 'Butter Croissant', price: 45000, size: '1 cái (Tiêu chuẩn)', stockStatus: 'Có sẵn hôm nay',
    description: 'Lớp vỏ nướng vàng óng, giòn rụm vỡ tan ngay khi cắn, ẩn chứa bên trong là kết cấu tổ ong hoàn hảo cùng hương bơ Pháp AOP thượng hạng quyến rũ.',
    ingredients: 'Bột mì, bơ Pháp AOP, sữa tươi.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-02', category: 'CS', name: 'Pain au Chocolat', price: 52000, size: '1 cái (Tiêu chuẩn)', stockStatus: 'Có sẵn hôm nay',
    description: 'Sự kết hợp kinh điển giữa lớp vỏ sừng bò ngàn lớp xốp nhẹ và hai thanh socola nguyên chất 65% từ Bỉ, mang lại vị đắng nhẹ tinh tế hòa quyện cùng bơ ngậy.',
    ingredients: 'Bột mì, bơ, socola đen Bỉ.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-03', category: 'CS', name: 'Almond Croissant', price: 55000, size: '1 cái (Tiêu chuẩn)', stockStatus: 'Có sẵn hôm nay',
    description: 'Chiếc croissant được tái sinh hoàn hảo qua lớp kem hạnh nhân (frangipane) mềm ẩm lẩn khuất bên trong, phủ bên ngoài là lớp hạnh nhân lát giòn tan nướng xém.',
    ingredients: 'Bột mì, bơ, kem hạnh nhân.', allergy: 'Gluten, Hạt, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-04', category: 'CS', name: 'Kouign-Amann', price: 58000, size: '1 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Nữ hoàng của các loại bánh nướng vùng Brittany. Lớp vỏ ngàn lớp cuộn cuộn được nướng cùng bơ và đường tạo thành lớp caramel bóng bẩy, giòn tan ngọt ngào.',
    ingredients: 'Bột mì, bơ, đường caramel.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-05', category: 'CS', name: 'Baguette Tradition', price: 35000, size: 'Ổ 250g', stockStatus: 'Có sẵn hôm nay',
    description: 'Chiếc Baguette truyền thống đúng chuẩn Pháp với lớp vỏ giòn cứng cáp, ruột dai mềm và lỗ khí to, dậy mùi men ủ tự nhiên chua nhẹ đặc trưng.',
    ingredients: 'Bột mì, men tự nhiên, muối.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-06', category: 'CS', name: 'Brioche Tressée', price: 65000, size: 'Ổ 300g', stockStatus: 'Có sẵn hôm nay',
    description: 'Bánh mì hoa cúc tết bím kiêu sa, thớ bánh xé ra dai mềm như mây, thơm lừng hương bơ Pháp và phảng phất chút dịu êm của vanilla nguyên quả.',
    ingredients: 'Bột mì, bơ, trứng, vanilla.', allergy: 'Trứng, Sữa, Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-07', category: 'CS', name: 'Ciabatta', price: 45000, size: 'Ổ 200g', stockStatus: 'Có sẵn hôm nay',
    description: 'Bánh mì mộc mạc mang linh hồn của nước Ý, vỏ dai nhẹ, ruột xốp rỗng rỗ khí to, thơm nồng nàn mùi dầu oliu nguyên chất ép lạnh.',
    ingredients: 'Bột mì, men, dầu oliu nguyên chất.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-08', category: 'CS', name: 'Focaccia Rosemary', price: 55000, size: 'Khay 200g', stockStatus: 'Có sẵn hôm nay',
    description: 'Bức tranh đồng quê Ý thu nhỏ với bề mặt bánh đính kèm lá hương thảo tươi, rắc muối biển hạt to và nướng đẫm trong dầu oliu.',
    ingredients: 'Bột mì, dầu oliu, muối biển, hương thảo.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-09', category: 'CS', name: 'Garlic & Herb Bread', price: 60000, size: 'Ổ 250g', stockStatus: 'Có sẵn hôm nay',
    description: 'Thỏa mãn vị giác với lớp bánh xé xốp mềm, được quét đẫm bơ tỏi nướng chảy hòa quyện cùng ngò tây xanh mát, thơm lừng nức mũi.',
    ingredients: 'Bột mì, bơ tỏi, ngò tây.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-10', category: 'CS', name: 'Cinnamon Roll', price: 45000, size: '1 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Cuộn bánh mềm ẩm với những đường vân quế nồng ấm, được phủ đẫm một lớp kem phô mai chua chua ngọt ngọt tan chảy.',
    ingredients: 'Bột, bơ, quế, cream cheese.', allergy: 'Sữa, Trứng, Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-11', category: 'CS', name: 'Pretzel', price: 40000, size: '1 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Đậm chất Đức với tạo hình xoắn nút truyền thống, lớp vỏ láng bóng, dai giòn sần sật điểm xuyết những hạt muối biển thô mặn mà.',
    ingredients: 'Bột lúa mạch, muối hạt.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-12', category: 'CS', name: 'Raspberry Croissant', price: 65000, size: '1 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Sừng bò hai màu rực rỡ với lớp vỏ vân đỏ nghệ thuật, giấu bên trong là lớp mứt mâm xôi tự nấu chua thanh, bùng nổ hương vị.',
    ingredients: 'Bột mì, bơ, mứt mâm xôi.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-13', category: 'CS', name: 'Classic Tiramisu', price: 75000, size: 'Ø 8cm - 1 người', stockStatus: 'Chỉ còn 3 bánh',
    description: 'Món tráng miệng lừng danh nước Ý. Lớp bánh quy sâm-panh đẫm vị cafe espresso đắng nhẹ, quyện trong lớp kem mascarpone béo ngậy.',
    ingredients: 'Mascarpone, cà phê, rượu Kahlua, cacao.', allergy: 'Cồn, Sữa, Trứng', image: '[suspicious link removed]'
  },
  {
    id: 'CS-14', category: 'CS', name: 'Lemon Meringue Tart', price: 70000, size: 'Ø 9cm - 1 người', stockStatus: 'Có sẵn hôm nay',
    description: 'Đế tart bơ giòn rụm ôm trọn lớp kem chanh vàng chua thanh mát lạnh, phía trên là tầng lòng trắng trứng khò lửa xém nhẹ.',
    ingredients: 'Đế tart, kem chanh, lòng trắng trứng.', allergy: 'Trứng, Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-15', category: 'CS', name: 'Panna Cotta', price: 65000, size: 'Hũ 150ml', stockStatus: 'Có sẵn hôm nay',
    description: 'Sự mềm mịn như lụa của kem sữa tươi nấu cùng vanilla béo ngậy, dùng kèm sốt quả mọng đỏ ruby chua ngọt cân bằng.',
    ingredients: 'Kem tươi, sữa, quả mọng.', allergy: 'Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-16', category: 'CS', name: 'Éclair au Chocolat', price: 60000, size: '1 chiếc', stockStatus: 'Có sẵn hôm nay',
    description: 'Bánh su kem thuôn dài thanh lịch của Pháp. Lớp vỏ choux phồng nhẹ, bên trong là nhân kem socola đắng êm ái.',
    ingredients: 'Bột choux, socola, kem tươi.', allergy: 'Sữa, Trứng, Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-17', category: 'CS', name: 'Basque Cheesecake', price: 85000, size: 'Slice (1/8 bánh)', stockStatus: 'Có sẵn hôm nay',
    description: 'Phô mai cháy chuẩn vị Tây Ban Nha. Mặt ngoài nướng xém đen mang vị caramel nhè nhẹ, bên trong siêu ẩm mịn.',
    ingredients: 'Cream cheese, trứng, kem tươi.', allergy: 'Sữa, Trứng', image: '[suspicious link removed]'
  },
  {
    id: 'CS-18', category: 'CS', name: 'Canelé de Bordeaux', price: 45000, size: '1 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Vỏ ngoài phủ sáp ong nướng sậm màu dai giòn caramel, ruột ẩm ướt như custard thơm nức mùi vanilla và rượu Rum.',
    ingredients: 'Sữa, trứng, rượu Rum, sáp ong.', allergy: 'Cồn, Sữa, Trứng, Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'CS-19', category: 'CS', name: 'Lemon Madeleine', price: 45000, size: 'Set 2 cái', stockStatus: 'Có sẵn hôm nay',
    description: 'Những chiếc bánh sò nhỏ xinh thanh tao mang đậm tính văn học Pháp. Bánh xốp nhẹ như bông, ngậy mùi bơ nâu.',
    ingredients: 'Bột mì, bơ nâu, vỏ chanh.', allergy: 'Trứng, Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'CS-20', category: 'CS', name: 'Crème Brûlée', price: 65000, size: 'Hũ gốm 120g', stockStatus: 'Có sẵn hôm nay',
    description: 'Kem trứng custard béo ngậy đặc sánh vị vanilla nguyên quả, đối lập hoàn hảo với lớp đường nâu được khò lửa trực tiếp.',
    ingredients: 'Lòng đỏ trứng, kem tươi, vanilla, đường.', allergy: 'Trứng, Sữa', image: '[suspicious link removed]'
  },

  // --- CỤM 2: BÁNH ĐẶT TRƯỚC (15 MÓN: DT-01 đến DT-15) ---
  {
    id: 'DT-01', category: 'DT', name: 'Sourdough Loaf', price: 85000, size: 'Ổ 500g', stockStatus: 'Đặt trước 24h',
    description: 'Ổ bánh mì mang sức sống tự nhiên, lên men chậm 48 tiếng. Lớp vỏ dày giòn rụm, ruột ẩm dai với vị chua nhẹ quyến rũ.',
    ingredients: 'Bột mì nguyên cám, men chua levain.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'DT-02', category: 'DT', name: 'Panettone Mini', price: 90000, size: '1 bánh mini', stockStatus: 'Đặt trước 24h',
    description: 'Chiếc bánh mùa lễ hội Ý. Thớ bánh xé ra mềm mịn như lụa, hòa quyện với nho khô và mứt vỏ cam chanh ướp rượu rum.',
    ingredients: 'Bột mì, trứng, mứt trái cây.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'DT-03', category: 'DT', name: 'Chocolate Babka', price: 85000, size: 'Ổ 400g', stockStatus: 'Đặt trước 24h',
    description: 'Ổ bánh tết bím Đông Âu. Cốt bánh mềm béo cuốn lấy những dải socola đen đắng đậm đà.',
    ingredients: 'Bột, bơ, socola đen, trứng.', allergy: 'Gluten, Sữa, Trứng', image: '[suspicious link removed]'
  },
  {
    id: 'DT-04', category: 'DT', name: 'Kugelhopf', price: 75000, size: 'Ø 14cm', stockStatus: 'Đặt trước 24h',
    description: 'Bánh nướng bơ truyền thống hình vương miện vùng Alsace. Kết cấu xốp nhẹ nhưng dồi dào hương bơ.',
    ingredients: 'Bột mì, bơ, nho khô, hạnh nhân.', allergy: 'Gluten, Sữa, Trứng, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'DT-05', category: 'DT', name: 'Pain de Campagne', price: 80000, size: 'Ổ 450g', stockStatus: 'Đặt trước 24h',
    description: 'Bánh mì đồng quê nước Pháp từ bột lúa mạch đen mix bột nguyên cám, hương vị ngũ cốc mộc mạc.',
    ingredients: 'Bột lúa mạch đen, bột nguyên cám, men.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'DT-06', category: 'DT', name: 'Mille-Feuille Whole', price: 350000, size: 'Ø 16cm - 4-6 người', stockStatus: 'Đặt trước 24h',
    description: 'Nghệ thuật ngàn lớp Pháp. Ba tầng bánh puff pastry nướng ép mỏng giòn tan, xen kẽ hai tầng kem pastry vanilla.',
    ingredients: 'Bột puff pastry, kem sữa vanilla nguyên quả.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'DT-07', category: 'DT', name: 'Paris-Brest (Size L)', price: 420000, size: 'Ø 18cm - 6-8 người', stockStatus: 'Đặt trước 24h',
    description: 'Tác phẩm hình vòng bánh xe đạp. Vỏ choux xốp nhẹ kẹp trọn lớp kem praline hạt phỉ béo ngậy.',
    ingredients: 'Bột choux, kem praline hạt phỉ.', allergy: 'Gluten, Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'DT-08', category: 'DT', name: 'Black Forest Cake', price: 550000, size: 'Ø 16cm - 6-8 người', stockStatus: 'Đặt trước 48h',
    description: 'Khu rừng đen nước Đức. Bông lan socola siêu mềm ướp rượu Kirsch, kẹp giữa kem tươi và cherry mọng nước.',
    ingredients: 'Bột cacao, cherry, rượu Kirsch.', allergy: 'Gluten, Trứng, Sữa, Cồn', image: '[suspicious link removed]'
  },
  {
    id: 'DT-09', category: 'DT', name: 'Opera Cake (20cm)', price: 650000, size: '20cm x 20cm - 6-8 người', stockStatus: 'Đặt trước 24h',
    description: 'Tuyệt tác sang trọng với 6 lớp bánh mỏng: Bông lan hạnh nhân Joconde thấm syrup cà phê, kem bơ cà phê và ganache socola.',
    ingredients: 'Bột hạnh nhân, cà phê, socola đen.', allergy: 'Gluten, Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'DT-10', category: 'DT', name: 'Sachertorte Whole', price: 580000, size: 'Ø 18cm - 6-8 người', stockStatus: 'Đặt trước 24h',
    description: 'Báu vật ẩm thực Áo. Cốt bánh socola đặc, phủ lớp mứt quả mơ chua ngọt giữa các tầng.',
    ingredients: 'Socola đen nguyên chất, mứt mơ.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'DT-11', category: 'DT', name: 'Mont Blanc Cake', price: 600000, size: 'Ø 16cm - 4-6 người', stockStatus: 'Đặt trước 48h',
    description: 'Ngọn núi tuyết thu nhỏ. Đế meringue giòn rụm, kem tươi thanh mát bao bọc bởi sợi kem hạt dẻ bùi bùi.',
    ingredients: 'Kem hạt dẻ, meringue, kem tươi.', allergy: 'Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'DT-12', category: 'DT', name: 'Charlotte aux Fraises', price: 550000, size: 'Ø 16cm - 4-6 người', stockStatus: 'Đặt trước 24h',
    description: 'Bánh công chúa lộng lẫy xếp viền bằng bánh quy sâm banh, bao bọc lớp mousse dâu tây mềm mịn.',
    ingredients: 'Bánh quy savoiardi, mousse dâu tây.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'DT-13', category: 'DT', name: 'Baba au Rhum (Set 6)', price: 450000, size: 'Set 6 hũ nhỏ', stockStatus: 'Đặt trước 24h',
    description: 'Thức bánh sành điệu. Cốt bánh men xốp nhẹ, ngâm đẫm syrup rượu Rum ngọt ngào cay nồng.',
    ingredients: 'Bột mì, rượu Rum, kem tươi.', allergy: 'Gluten, Trứng, Sữa, Cồn', image: '[suspicious link removed]'
  },
  {
    id: 'DT-14', category: 'DT', name: 'Apple Strudel Whole', price: 380000, size: 'Cuộn dài 30cm', stockStatus: 'Đặt trước 24h',
    description: 'Cuộn táo truyền thống nước Áo. Lớp bột kéo mỏng tang cuộn lấy nhân táo hạt lựu, nho khô và quế.',
    ingredients: 'Bột mỏng, táo tươi, nho khô, quế.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'DT-15', category: 'DT', name: 'Profiterole Tower', price: 750000, size: 'Tháp 25 viên su', stockStatus: 'Đặt trước 48h',
    description: 'Tháp su kem lộng lẫy cho tiệc kỷ niệm. Những viên choux nhồi kem vanilla xếp cao, rưới đẫm sốt socola.',
    ingredients: 'Bột choux, kem vanilla, sốt socola.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },

  // --- CỤM 3: BÁNH SALE (10 MÓN: SL-01 đến SL-10) ---
  {
    id: 'SL-01', category: 'SL', name: 'Chausson aux Pommes', price: 35000, originalPrice: 50000, size: '1 cái', stockStatus: 'Flash sale',
    description: 'Bánh xếp ngàn lớp hình bán nguyệt đẹp mắt, ôm trọn phần mứt táo ninh nấu chậm với quế.',
    ingredients: 'Bột mì, bơ, táo tươi.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'SL-02', category: 'SL', name: 'Pain aux Raisins', price: 30000, originalPrice: 48000, size: '1 cái', stockStatus: 'Flash sale',
    description: 'Bánh cuộn ốc sên vỏ ngàn lớp giòn rụm, xen giữa là kem trứng custard béo ngậy và nho khô ngọt dịu.',
    ingredients: 'Bột mì, nho khô, kem trứng.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'SL-03', category: 'SL', name: 'Berry Danish', price: 40000, originalPrice: 55000, size: '1 cái', stockStatus: 'Flash sale',
    description: 'Đóa hoa ngàn lớp Đan Mạch khoe sắc với kem phô mai chua dịu và dâu tây tươi mọng nước.',
    ingredients: 'Bột mì, bơ, dâu tây, cream cheese.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'SL-04', category: 'SL', name: 'Pumpernickel', price: 50000, originalPrice: 75000, size: 'Ổ 350g', stockStatus: 'Giảm giá trong ngày',
    description: 'Dòng bánh đen nguyên cám đặc ruột nước Đức, tốt cho sức khỏe với vị ngọt nhẹ từ mật đường molasses.',
    ingredients: 'Lúa mạch đen, mật đường.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'SL-05', category: 'SL', name: 'English Muffin', price: 20000, originalPrice: 35000, size: '1 cái', stockStatus: 'Happy hour',
    description: 'Bánh mì ăn sáng chuẩn kiểu Anh. Hình tròn dẹt xốp nhẹ, ngon nhất khi cắt đôi nướng giòn trét bơ.',
    ingredients: 'Bột mì, bơ, sữa.', allergy: 'Gluten, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'SL-06', category: 'SL', name: 'Challah Bread', price: 55000, originalPrice: 70000, size: 'Ổ 300g', stockStatus: 'Khuyến mãi',
    description: 'Bánh mì Do Thái rực rỡ với màu vàng ươm từ trứng và mật ong, thớ bánh dệt lại thành bím xốp mềm.',
    ingredients: 'Bột mì, trứng, mật ong.', allergy: 'Gluten, Trứng', image: '[suspicious link removed]'
  },
  {
    id: 'SL-07', category: 'SL', name: 'Bostock', price: 35000, originalPrice: 50000, size: '1 lát lớn', stockStatus: 'Giảm giá',
    description: 'Lát bánh Brioche tẩm syrup hoa cam ngát hương, phết lớp kem hạnh nhân dày và nướng xém.',
    ingredients: 'Brioche, kem hạnh nhân, syrup hoa cam.', allergy: 'Gluten, Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'SL-08', category: 'SL', name: 'Fougasse', price: 45000, originalPrice: 60000, size: 'Ổ chiếc lá', stockStatus: 'Sale cuối ngày',
    description: 'Chiếc bánh mì nghệ thuật mô phỏng hình chiếc lá từ Provence, mằn mặn hương vị thảo mộc và ô liu.',
    ingredients: 'Bột mì, ô liu đen, thảo mộc.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'SL-09', category: 'SL', name: 'Kaiser Roll', price: 15000, originalPrice: 25000, size: '1 cái', stockStatus: 'Mua 2 tặng 1',
    description: 'Ổ bánh mì tròn nhỏ của hoàng đế Áo, vỏ ngoài giòn rụm lấm tấm hạt anh túc.',
    ingredients: 'Bột mì, hạt anh túc.', allergy: 'Gluten', image: '[suspicious link removed]'
  },
  {
    id: 'SL-10', category: 'SL', name: 'Ficelle', price: 15000, originalPrice: 25000, size: '1 ổ dài', stockStatus: 'Sale cuối ngày',
    description: 'Phiên bản gầy và dài hơn của Baguette, dành riêng cho tín đồ mê bánh mì vỏ giòn.',
    ingredients: 'Bột mì, men tự nhiên.', allergy: 'Gluten', image: '[suspicious link removed]'
  },

  // --- CỤM 4: ƯU ĐÃI (5 MÓN: UD-01 đến UD-05) ---
  {
    id: 'UD-01', category: 'UD', name: 'Combo Morning Paris', price: 85000, size: 'Combo 1 người', stockStatus: 'Có sẵn',
    description: '1 chiếc Croissant mặn kẹp jambon phô mai nướng chảy, dùng kèm 1 ly nước ép cam tươi vắt mát lạnh.',
    ingredients: 'Bánh sừng bò mặn jambon, phô mai, nước cam ép.', allergy: 'Gluten, Sữa, Thịt', image: '[suspicious link removed]'
  },
  {
    id: 'UD-02', category: 'UD', name: 'Set Stromboli Chill', price: 120000, size: 'Set 1 người', stockStatus: 'Có sẵn',
    description: '1 phần bánh mì Ý Stromboli cuộn thịt nguội nướng nóng hổi, nhâm nhi cùng 1 ly bia thủ công IPA.',
    ingredients: 'Bánh mì cuộn thịt nguội, phô mai, Bia IPA.', allergy: 'Gluten, Sữa, Cồn, Thịt', image: '[suspicious link removed]'
  },
  {
    id: 'UD-03', category: 'UD', name: 'Cruffin Vanilla Box', price: 110000, size: 'Hộp 3 chiếc', stockStatus: 'Ưu đãi Mua 2 Tặng 1',
    description: 'Hộp quà tặng với 3 chiếc Cruffin ngàn lớp, bên trong bơm đẫm kem trứng vanilla béo ngậy.',
    ingredients: 'Bột mì, bơ, kem vanilla nguyên quả.', allergy: 'Gluten, Trứng, Sữa', image: '[suspicious link removed]'
  },
  {
    id: 'UD-04', category: 'UD', name: 'French Macaron Trio', price: 76500, size: 'Hộp 3 viên', stockStatus: 'Giảm 10% VIP',
    description: 'Hộp 3 viên ngọc nước Pháp: Vỏ giòn tan mỏng manh, nhân dẻo quánh (Hạt dẻ cười, Socola, Mâm xôi).',
    ingredients: 'Bột hạnh nhân, socola, mâm xôi, pistachio.', allergy: 'Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  },
  {
    id: 'UD-05', category: 'UD', name: 'Almond Financier Gift', price: 250000, size: 'Hộp quà 5 thỏi', stockStatus: 'Hộp quà cao cấp',
    description: 'Hộp quà tặng doanh nghiệp tinh tế. 5 thỏi bánh Financier thơm nức bơ đun nâu và bột hạnh nhân.',
    ingredients: 'Bột hạnh nhân, bơ nâu, lòng trắng trứng.', allergy: 'Gluten, Trứng, Sữa, Hạt', image: '[suspicious link removed]'
  }
];

const DISTRICT_SHIPPING_FEES = {
  'Quận 1': 20000,
  'Quận 3': 20000,
  'Quận 2 (TP. Thủ Đức)': 30000,
  'Quận 4': 30000,
  'Quận 5': 30000,
  'Quận 10': 30000,
  'Quận Bình Thạnh': 30000,
  'Quận Phú Nhuận': 30000,
  'Quận 7': 40000,
  'Quận 8': 40000,
  'Quận Tân Bình': 40000,
  'Quận Gò Vấp': 40000,
  'Quận 12 / Bình Tân / Ngoại thành': 50000
};

const FAQ_DATA = [
  {
    q: 'Tôi muốn nhận bánh hôm nay có được không?',
    a: 'Đối với danh mục "Bánh Có Sẵn", tiệm có thể chuẩn bị và giao hỏa tốc ngay trong ngày cho quý khách. Với "Bánh Đặt Trước", bếp cần ít nhất 24h - 48h để chuẩn bị chỉn chu nhất.'
  },
  {
    q: 'Đặt bánh có cần cọc tiền không?',
    a: 'Các đơn thuộc danh mục "Bánh Đặt Trước" hoặc đơn >500.000 VNĐ cần thanh toán cọc trước 50%. Các đơn "Bánh Có Sẵn" giao ngay trong ngày có thể chọn thanh toán COD.'
  },
  {
    q: 'Tôi có thể yêu cầu trang trí bánh theo sở thích không?',
    a: 'Để giữ trọn vẹn tinh thần nghệ thuật chuẩn mực (phong cách Vagabond), tiệm giữ nguyên thiết kế gốc. Tiệm hỗ trợ điều chỉnh nhỏ về tone màu hoặc phụ kiện cơ bản.'
  },
  {
    q: 'Có thể gửi kèm lời chúc riêng không?',
    a: 'Tiệm hỗ trợ in lời chúc lên biển tên cắm trực tiếp trên mặt bánh (tối đa 60 ký tự) hoặc tặng kèm thiệp giấy cao cấp thiết kế riêng.'
  }
];

export default function LaPetiteVienneApp() {
  const [activeTab, setActiveTab] = useState('CS');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [customFlagText, setCustomFlagText] = useState('');
  const [modalQty, setModalQty] = useState(1);

  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); 
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('13h - 15h');
  const [selectedDistrict, setSelectedDistrict] = useState('Quận 1');

  const handleAddToCart = (product, qty = 1, flagText = '') => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      qty,
      flagText,
      gifts: ['Hộp bánh cao cấp', 'Túi vải đen xách tay', 'Dao gỗ cắt bánh', 'Nến xoắn (6 cây)']
    };
    setCart([...cart, cartItem]);
    setSelectedProduct(null);
    setCustomFlagText('');
    setModalQty(1);
    setIsCartOpen(true);
  };

  const updateCartQty = (cartId, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = deliveryMethod === 'delivery' ? (DISTRICT_SHIPPING_FEES[selectedDistrict] || 30000) : 0;
  const finalTotal = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-[#12100E] text-[#E5DCD3] font-sans">
      
      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#1A1614]/95 backdrop-blur-md border-b border-[#3A2E28]">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center relative">
          <div className="inline-block">
            <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-[#D4AF37] font-bold uppercase">
              LA PETITE VIENNE
            </h1>
            <p className="text-[11px] tracking-wider text-[#A69385] uppercase italic mt-0.5">
              Patisserie & Cafe — Style The Vagabond
            </p>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#2A221E] hover:bg-[#3A2E28] p-2.5 rounded-full border border-[#D4AF37]/30 transition"
          >
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#12100E] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>

        <nav className="flex justify-center space-x-2 md:space-x-6 border-t border-[#2A221E] bg-[#12100E]/80 px-4 py-3 overflow-x-auto">
          {[
            { id: 'CS', label: 'BÁNH CÓ SẴN (20)' },
            { id: 'DT', label: 'BÁNH ĐẶT TRƯỚC (15)' },
            { id: 'SL', label: 'BÁNH SALE (10)' },
            { id: 'UD', label: 'ƯU ĐÃI (5)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wider transition whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-[#6B4226] text-[#D4AF37] border border-[#D4AF37]/60 shadow-lg font-bold' 
                  : 'text-[#A69385] hover:text-[#E5DCD3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* HERO BANNER */}
      <section className="py-8 px-4 text-center bg-gradient-to-b from-[#1A1614] to-[#12100E] border-b border-[#2A221E]">
        <p className="text-[#D4AF37] text-[11px] tracking-widest uppercase mb-1">Hương vị Châu Âu nguyên bản trong từng lớp bánh</p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#E5DCD3]">Danh Mục 50 Món Bánh Nghệ Thuật Pháp</h2>
      </section>

      {/* CATALOGUE */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS_DATA.filter(p => p.category === activeTab).map(product => (
            <div 
              key={product.id}
              className="bg-[#1A1614] border border-[#2A221E] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden shadow-xl transition group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-[#241E1A]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#12100E]/90 text-[#D4AF37] text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border border-[#D4AF37]/30">
                    {product.id}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-serif text-base text-[#E5DCD3] mb-1 group-hover:text-[#D4AF37] transition font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#A69385] line-clamp-2 mb-3">{product.description}</p>
                  
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[#D4AF37] font-bold text-sm">
                      {product.price.toLocaleString('vi-VN')} VNĐ
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#A69385] line-through">
                        {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-0 flex space-x-2">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-2 text-xs border border-[#3A2E28] hover:border-[#D4AF37] text-[#E5DCD3] rounded-lg transition"
                >
                  Xem chi tiết
                </button>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="px-3.5 py-2 text-xs bg-[#6B4226] hover:bg-[#825230] text-[#D4AF37] font-medium rounded-lg transition border border-[#D4AF37]/30"
                >
                  + Giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* POPUP DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1614] border border-[#3A2E28] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative text-[#E5DCD3]">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#A69385] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-52 object-cover rounded-xl mb-4 border border-[#2A221E]"
            />

            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs text-[#D4AF37] font-bold tracking-widest">{selectedProduct.id}</span>
                <h3 className="text-xl font-serif font-bold text-[#E5DCD3]">{selectedProduct.name}</h3>
              </div>
              <span className="text-lg font-bold text-[#D4AF37]">
                {selectedProduct.price.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>

            <p className="text-xs text-[#A69385] mb-4 bg-[#241E1A] p-2.5 rounded-lg border border-[#3A2E28]">
              <strong>Kích thước chuẩn:</strong> {selectedProduct.size} <br/>
              <strong>Tình trạng:</strong> {selectedProduct.stockStatus}
            </p>

            <div className="space-y-2 text-xs mb-5 text-[#A69385]">
              <p><strong>Mô tả hương vị:</strong> {selectedProduct.description}</p>
              <p><strong>Thành phần:</strong> {selectedProduct.ingredients}</p>
              <p className="text-amber-500/90"><strong>Cảnh báo dị ứng:</strong> {selectedProduct.allergy}</p>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
                LỜI CHÚC IN TRÊN CỜ (Tối đa 60 ký tự) *
              </label>
              <input 
                type="text"
                maxLength={60}
                placeholder="VD: Chúc mừng sinh nhật Minh Anh!"
                value={customFlagText}
                onChange={(e) => setCustomFlagText(e.target.value)}
                className="w-full bg-[#12100E] border border-[#3A2E28] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#E5DCD3] outline-none"
              />
            </div>

            <div className="mb-5 bg-[#241E1A] p-3 rounded-lg border border-[#3A2E28]">
              <p className="text-xs font-semibold text-[#D4AF37] mb-1.5">Quà tặng kèm miễn phí (Có sẵn):</p>
              <ul className="text-[11px] text-[#A69385] grid grid-cols-2 gap-1">
                <li className="flex items-center"><Check className="w-3 h-3 mr-1 text-[#D4AF37]" /> Hộp bánh cao cấp</li>
                <li className="flex items-center"><Check className="w-3 h-3 mr-1 text-[#D4AF37]" /> Túi vải đen xách tay</li>
                <li className="flex items-center"><Check className="w-3 h-3 mr-1 text-[#D4AF37]" /> Dao gỗ cắt bánh</li>
                <li className="flex items-center"><Check className="w-3 h-3 mr-1 text-[#D4AF37]" /> Nến xoắn (vỉ 6 cây)</li>
              </ul>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-[#3A2E28] rounded-lg bg-[#12100E]">
                <button onClick={() => setModalQty(Math.max(1, modalQty - 1))} className="p-2 text-[#A69385]">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2.5 text-xs font-semibold">{modalQty}</span>
                <button onClick={() => setModalQty(modalQty + 1)} className="p-2 text-[#A69385]">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => handleAddToCart(selectedProduct, modalQty, customFlagText)}
                className="flex-1 bg-[#6B4226] hover:bg-[#825230] text-[#D4AF37] font-bold py-3 rounded-lg text-xs tracking-wider uppercase border border-[#D4AF37]/50 transition"
              >
                THÊM VÀO GIỎ - {(selectedProduct.price * modalQty).toLocaleString('vi-VN')} VNĐ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-[#1A1614] border-l border-[#3A2E28] w-full max-w-md h-full flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#2A221E]">
                <h3 className="font-serif text-base font-bold text-[#D4AF37]">Giỏ Hàng & Thanh Toán</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-[#A69385] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-3 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-[#A69385] py-8">Giỏ hàng của bạn đang trống.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center bg-[#241E1A] p-2.5 rounded-lg border border-[#3A2E28]">
                      <div>
                        <h4 className="text-xs font-semibold text-[#E5DCD3]">{item.name}</h4>
                        <p className="text-[11px] text-[#D4AF37]">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                        {item.flagText && (
                          <p className="text-[10px] text-[#A69385] italic">Cờ: "{item.flagText}"</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateCartQty(item.cartId, -1)} className="p-1 bg-[#12100E] rounded">
                          <Minus className="w-3 h-3 text-[#A69385]" />
                        </button>
                        <span className="text-xs font-medium">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.cartId, 1)} className="p-1 bg-[#12100E] rounded">
                          <Plus className="w-3 h-3 text-[#A69385]" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-[#2A221E] text-xs">
                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-1">Khung Giờ Nhận Bánh *</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['13h - 15h', '15h - 17h', '17h - 19h'].map(slot => (
                        <button 
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-1.5 rounded text-center text-[11px] border ${
                            selectedTimeSlot === slot ? 'border-[#D4AF37] bg-[#6B4226]/50 text-[#D4AF37] font-bold' : 'border-[#3A2E28] text-[#A69385]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-1">Hình thức nhận bánh</label>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`flex-1 p-2 rounded border text-center text-xs ${deliveryMethod === 'delivery' ? 'border-[#D4AF37] bg-[#6B4226]/50 text-[#D4AF37] font-bold' : 'border-[#3A2E28] text-[#A69385]'}`}
                      >
                        Giao tận nơi
                      </button>
                      <button 
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`flex-1 p-2 rounded border text-center text-xs ${deliveryMethod === 'pickup' ? 'border-[#D4AF37] bg-[#6B4226]/50 text-[#D4AF37] font-bold' : 'border-[#3A2E28] text-[#A69385]'}`}
                      >
                        Tự đến lấy
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="block text-[#D4AF37] font-semibold mb-1">Khu vực Quận/Huyện (Tính phí ship)</label>
                      <select 
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full bg-[#12100E] border border-[#3A2E28] p-2 rounded text-xs text-[#E5DCD3] outline-none"
                      >
                        {Object.keys(DISTRICT_SHIPPING_FEES).map(dist => (
                          <option key={dist} value={dist}>{dist} — {DISTRICT_SHIPPING_FEES[dist].toLocaleString('vi-VN')} VNĐ</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    <input 
                      type="text" placeholder="Họ và tên người nhận *" 
                      className="w-full bg-[#12100E] border border-[#3A2E28] p-2 rounded text-xs outline-none"
                    />
                    <input 
                      type="tel" placeholder="Số điện thoại *" 
                      className="w-full bg-[#12100E] border border-[#3A2E28] p-2 rounded text-xs outline-none"
                    />
                    {deliveryMethod === 'delivery' && (
                      <input 
                        type="text" placeholder="Địa chỉ chi tiết (Số nhà, Tên đường) *" 
                        className="w-full bg-[#12100E] border border-[#3A2E28] p-2 rounded text-xs outline-none"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-3 border-t border-[#2A221E] space-y-1.5">
                <div className="flex justify-between text-xs text-[#A69385]">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between text-xs text-[#A69385]">
                    <span>Phí giao hàng ({selectedDistrict}):</span>
                    <span>{shippingFee.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#D4AF37] pt-1">
                  <span>Tổng thanh toán:</span>
                  <span>{finalTotal.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <button 
                  onClick={() => alert('Yêu cầu đặt bánh đã được gửi thành công!')}
                  className="w-full bg-[#6B4226] hover:bg-[#825230] text-[#D4AF37] py-3 rounded-lg font-bold tracking-wider uppercase text-xs border border-[#D4AF37]/50 mt-2"
                >
                  GỬI YÊU CẦU ĐẶT BÁNH
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-[#2A221E]">
        <h3 className="text-lg font-serif text-center text-[#D4AF37] mb-6 uppercase tracking-wider font-bold">
          Câu Hỏi Thường Gặp (FAQ)
        </h3>
        <div className="space-y-2.5">
          {FAQ_DATA.map((faq, idx) => (
            <div key={idx} className="bg-[#1A1614] border border-[#2A221E] rounded-lg overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3.5 text-left font-medium text-xs md:text-sm flex justify-between items-center text-[#E5DCD3]"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#D4AF37]" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37]" />}
              </button>
              {openFaq === idx && (
                <div className="p-3.5 bg-[#241E1A] text-xs text-[#A69385] border-t border-[#2A221E]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1614] border-t border-[#3A2E28] py-8 px-4 text-xs text-[#A69385]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold text-xs mb-2 uppercase">CÔNG TY TNHH LA PETITE VIENNE</h4>
            <p>Mã số thuế: 031xxxxxxx</p>
            <p className="mt-1 italic">"Hương vị Châu Âu nguyên bản trong từng lớp bánh."</p>
          </div>

          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold text-xs mb-2 uppercase">HỆ THỐNG CỬA HÀNG</h4>
            <p>• <strong>Cafe (Q1):</strong> Tầng 1, 123 Lê Lợi, P. Bến Nghé, Q.1, TP. HCM</p>
            <p className="mt-1">• <strong>Kitchen Studio (Q3):</strong> 456 Nguyễn Đình Chiểu, P. Võ Thị Sáu, Q.3, TP. HCM</p>
          </div>

          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold text-xs mb-2 uppercase">LIÊN HỆ & CHÍNH SÁCH</h4>
            <p>Hotline: +84 392 411 839 | Zalo: 0392411839</p>
            <p>Email: contact@lapetitevienne.vn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}