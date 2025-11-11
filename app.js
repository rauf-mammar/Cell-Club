// إنشاء تأثيرات الفقاعات في الخلفية
function createBubbles() {
    const magicBg = document.getElementById('magicBg');
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 100 + 50;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        
        magicBg.appendChild(bubble);
    }
}

// معالجة تقديم النموذج
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // عرض حالة التحميل
    submitBtn.innerHTML = '<span class="loading"></span> جاري التسجيل...';
    submitBtn.disabled = true;
    
    // جمع بيانات النموذج
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        specialization: document.getElementById('specialization').value,
        talent: document.getElementById('talent').value,
        reason: document.getElementById('reason').value,
        registrationNumber: document.getElementById('registrationNumber').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    try {
        // حفظ البيانات في Firebase
        await db.collection('registrations').add(formData);
        
        // إرسال بريد إلكتروني (محاكاة)
        await sendWelcomeEmail(formData);
        
        // عرض رسالة النجاح
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
        
        // إعادة تعيين النموذج
        this.reset();
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
    } finally {
        // إعادة زر الإرسال إلى حالته الأصلية
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
    
    // تمرير إلى أعلى الصفحة لرؤية رسالة النجاح
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// دالة محاكاة لإرسال البريد الإلكتروني
async function sendWelcomeEmail(userData) {
    // في التطبيق الحقيقي، سيتم استدعاء API لإرسال البريد الإلكتروني
    // باستخدام Node.js و nodemailer
    
    const emailData = {
        to: userData.email,
        subject: 'مرحباً بك في نادي Cell Club!',
        html: `
            <div dir="rtl" style="font-family: 'Tajawal', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #90EE90, #98FB98); border-radius: 15px;">
                <h2 style="color: #2E8B57; text-align: center;">مرحباً ${userData.firstName}!</h2>
                <p style="font-size: 16px; line-height: 1.6;">نحن سعداء جداً بانضمامك إلى نادي Cell Club. طلبك قيد المراجعة حالياً.</p>
                
                <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #3CB371;">تفاصيل طلبك:</h3>
                    <p><strong>الاسم:</strong> ${userData.firstName} ${userData.lastName}</p>
                    <p><strong>التخصص:</strong> ${userData.specialization}</p>
                    <p><strong>الموهبة:</strong> ${userData.talent}</p>
                    <p><strong>رقم التسجيل:</strong> ${userData.registrationNumber}</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <h3 style="color: #2E8B57;">انضم إلى مجتمعنا على Discord</h3>
                    <p style="margin-bottom: 20px;">انقر على الرابط أدناه للانضمام إلى مجتمعنا:</p>
                    <a href="https://discord.gg/cellclub" style="display: inline-block; background: #5865F2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                        انضم إلى Discord
                    </a>
                </div>
                
                <div style="border-top: 2px solid #98FB98; padding-top: 20px; text-align: center;">
                    <p style="color: #666; font-size: 14px;">مع خالص التقدير،<br>فريق Cell Club</p>
                </div>
            </div>
        `
    };
    
    // محاكاة إرسال البريد الإلكتروني
    console.log('إرسال بريد إلكتروني إلى:', userData.email);
    console.log('بيانات البريد:', emailData);
    
    return new Promise((resolve) => {
        setTimeout(resolve, 2000); // محاكاة وقت الإرسال
    });
}

// تهيئة التأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    createBubbles();
});
