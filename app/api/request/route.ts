import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, service, address, message, preferredTime } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Họ tên không được để trống.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Số điện thoại không được để trống.' },
        { status: 400 }
      );
    }

    if (!service || typeof service !== 'string' || !service.trim()) {
      return NextResponse.json(
        { success: false, error: 'Dịch vụ không được để trống.' },
        { status: 400 }
      );
    }

    if (!address || typeof address !== 'string' || !address.trim()) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ không được để trống.' },
        { status: 400 }
      );
    }

    const timeFormatted = preferredTime || 'Không chỉ định';
    const messageFormatted = message || 'Không có ghi chú thêm';

    // Insert lead request into Supabase table contact_requests
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: dbError } = await supabase.from('contact_requests').insert({
          name: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          service: service.trim(),
          note: `Thời gian: ${timeFormatted} | Ghi chú: ${messageFormatted}`,
          status: 'pending',
        });

        if (dbError) {
          console.error('>>> Error inserting contact request into Supabase:', dbError.message);
        } else {
          console.log('>>> Contact request saved successfully to Supabase DB!');
        }
      } catch (dbErr) {
        console.error('>>> Exception saving contact request to Supabase:', dbErr);
      }
    }

    const logText = `
==================================================
[YEU CAU DICH VU MOI - DIEN LANH SON PHAT PHU QUOC]
Khach hang: ${fullName.trim()}
Dien thoai: ${phone.trim()}
Dich vu: ${service.trim()}
Dia chi: ${address.trim()}
Thoi gian: ${timeFormatted}
Ghi chu: ${messageFormatted}
Thoi gian gui: ${new Date().toLocaleString('vi-VN')}
==================================================
    `;

    console.log(logText);

    // Zalo OA API Notification Integration (Optional if ENV variables provided)
    const zaloToken = process.env.ZALO_OA_ACCESS_TOKEN;
    const zaloRecipient = process.env.ZALO_OA_RECIPIENT;

    if (zaloToken && zaloRecipient) {
      try {
        const zaloMsgPayload = {
          recipient: { user_id: zaloRecipient },
          message: {
            text: `[YEU CAU DICH VU MOI]\nKhach: ${fullName.trim()}\nDien thoai: ${phone.trim()}\nDich vu: ${service.trim()}\nDia chi: ${address.trim()}\nThoi gian: ${timeFormatted}\nGhi chu: ${messageFormatted}`,
          },
        };

        await fetch('https://openapi.zalo.me/v2.0/oa/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access_token: zaloToken,
          },
          body: JSON.stringify(zaloMsgPayload),
        });
        console.log('>>> Thong bao Zalo OA da duoc gui thanh cong!');
      } catch (zaloErr) {
        console.error('>>> Loi gui tin nhan Zalo OA:', zaloErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Gửi yêu cầu dịch vụ thành công! Kỹ thuật viên sẽ liên hệ lại ngay.',
        data: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          service: service.trim(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('>>> Request API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Xảy ra lỗi hệ thống, vui lòng gọi điện thoại trực tiếp.' },
      { status: 500 }
    );
  }
}
