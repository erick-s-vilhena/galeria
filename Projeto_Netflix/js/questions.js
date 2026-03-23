const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const trigger = item.querySelector('.faq-trigger');
  const content = item.querySelector('.faq-content');
  const icon = item.querySelector('.faq-icon');

  trigger.addEventListener('click', () => {
    const isOpen = !content.classList.contains('hidden');

    faqItems.forEach((otherItem) => {
      const otherContent = otherItem.querySelector('.faq-content');
      const otherIcon = otherItem.querySelector('.faq-icon');

      otherContent.classList.add('hidden');
      otherIcon.classList.remove('rotate-45');
    });

    if (!isOpen) {
      content.classList.remove('hidden');
      icon.classList.add('rotate-45');
    }
  });
});