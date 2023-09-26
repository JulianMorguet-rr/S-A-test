console.log('das Script ist da!')
  
// Observer 
function initObserver() {
console.log('OBSERVER STARTED!!!')

const sections = [...document.querySelectorAll('section')];

const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    // if (entry.intersectionRatio > 0) {
    if (entry.isIntersecting) {
        // entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('observer-detected');
        intersectionObserver.unobserve(entry.target);
    }
    console.log(entry)
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    intersectionObserver.observe(section);
});
}
initObserver();