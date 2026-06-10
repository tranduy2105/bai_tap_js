const faqCauHoi = document.querySelectorAll('.faq-cau-hoi');

faqCauHoi.forEach(item => {
    item.addEventListener('click', () => {

        const traLoi = item.nextElementSibling;
        const dangMo = traLoi.style.display === 'block';

        document.querySelectorAll('.faq-tra-loi').forEach(el => {
            el.style.display = 'none';
        });

        if (!dangMo) {
            traLoi.style.display = 'block';
        }
    });
});