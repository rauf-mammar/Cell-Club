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

// إنشاء جسيمات متوهجة
function createParticles() {
    const magicBg = document.getElementById('magicBg');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;

        magicBg.appendChild(particle);
    }
}

// تأثير الماوس المتتبع
function createMouseFollower() {
    const follower = document.createElement('div');
    follower.classList.add('mouse-follower');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(124, 252, 0, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        transition: transform 0.1s ease-out;
        opacity: 0;
    `;
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
}

// معالجة تقديم النموذج
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    const originalText = submitBtn.innerHTML;
    
    // عرض حالة التحميل
    submitBtn.innerHTML = '<span class="loading"></span> جاري التسجيل...';
    submitBtn.disabled = true;
    
    // إخفاء الرسائل السابقة
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
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
        timestamp: new Date().toLocaleString('ar-SA')
    };
    
    // محاكاة إرسال البيانات (يمكن استبدالها بخدمة حقيقية)
    setTimeout(() => {
        try {
            // حفظ البيانات في localStorage (بديل مؤقت)
            const submissions = JSON.parse(localStorage.getItem('clubSubmissions') || '[]');
            submissions.push({
                ...formData,
                id: Date.now()
            });
            localStorage.setItem('clubSubmissions', JSON.stringify(submissions));
            
            // عرض رسالة النجاح
            successMsg.style.display = 'block';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                تم تقديم طلبك بنجاح! <br>
                <strong>${formData.firstName} ${formData.lastName}</strong> <br>
                سنتواصل معك على: ${formData.email}
            `;
            
            // إعادة تعيين النموذج
            document.getElementById('registrationForm').reset();
            
            console.log('تم التسجيل بنجاح:', formData);
            
        } catch (error) {
            console.error('Error:', error);
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = `
                <i class="fas fa-exclamation-circle"></i> 
                حدث خطأ أثناء التسجيل: ${error.message}
            `;
        } finally {
            // إعادة زر الإرسال إلى حالته الأصلية
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        
        // التمرير إلى أعلى الصفحة لرؤية الرسالة
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
});

// عرض البيانات المحفوظة في console (للتطوير)
function showSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('clubSubmissions') || '[]');
    console.log('الطلبات المسجلة:', submissions);
    return submissions;
}

// تأثيرات التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // إضافة الأقسام للمراقبة
    const sections = document.querySelectorAll('.registration-section, .club-info, .social-section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // إضافة تأثيرات مختلفة للعناصر
    const headers = document.querySelectorAll('h2, h3');
    headers.forEach((header, index) => {
        if (index % 2 === 0) {
            header.classList.add('slide-in-left');
        } else {
            header.classList.add('slide-in-right');
        }
        observer.observe(header);
    });
}

// تهيئة التأثيرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    createBubbles();
    createParticles();
    createMouseFollower();
    initScrollAnimations();
    console.log('تم تحميل الموقع بنجاح ✅');

    // عرض الطلبات السابقة في console
    showSubmissions();
});
