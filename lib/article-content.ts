export type ArticleSection = {
  id?: string;
  heading?: string;
  paragraphs: string[];
};

export type ArticleContent = {
  shortAnswer: string;
  sections: ArticleSection[];
  code?: { label: string; source: string };
  toc: { id: string; label: string }[];
  takeaways: string[];
  faq: { question: string; answer: string }[];
  related?: { label: string; href: string };
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
};

/**
 * Placeholder rich content, keyed by post slug, standing in for a real
 * content source (MDX, a CMS) — see lib/posts.ts.
 */
export const articleContent: Record<string, ArticleContent> = {
  "determine-when-a-sticky-element-is-stuck": {
    shortAnswer:
      "CSS has no :stuck pseudo-class, so you detect it in JavaScript: cache the element's computed top value once, then on a throttled scroll event compare getBoundingClientRect().top against it and toggle a class when the two match. Use IntersectionObserver instead only when the sticky element sits at the very top of the page.",
    sections: [
      {
        paragraphs: [
          'Using position: sticky is a handy CSS positioning property that allows elements to stick to the top of a relative parent on scroll. It\'s a considerable step forward compared to the older methods of scrolling down the page, past a specific offset and dynamically "fixing" the element to the browser window using position: fixed.',
        ],
      },
      {
        id: "challenge",
        heading: "The Challenge",
        paragraphs: [
          'It\'s not possible in CSS to quickly determine when an element is "stuck." This can be frustrating, as sticky headers often require different designs and treatments when they scroll. It would be great if the spec provided a "pinned" or "stuck" pseudo-class, but that\'s not an option.',
          'To tackle this, you can use a nifty JavaScript function to determine when an element is "stuck":',
        ],
      },
      {
        id: "explanation",
        heading: "Explanation of The Code",
        paragraphs: [
          "We create a function called determineStickyState, which takes the sticky element as a parameter. It is bound to a scroll event listener on the window object. We leverage a throttle function here to minimize the scroll event's performance cost, which is expensive for the browser — throttle helps us by only firing the event once every 200 milliseconds.",
          "We declare two unscoped variables, then check if stickyElementStyle is not defined. We do this because window.getComputedStyle is an expensive computation, especially when firing on an event like scroll. Caching both values means we can return to the cached value if the element's style does not change.",
        ],
      },
      {
        id: "observer",
        heading: "Why Does Intersection Observer Not Work",
        paragraphs: [
          "The IntersectionObserver API would have been my first choice in this scenario. The problem is that to force the observer to understand when a sticky element is stuck, you have to use a slight hack in CSS by setting the top value of the component to −1px. That approach would be acceptable if the sticky element were a header that would always be the first element on the page.",
        ],
      },
    ],
    code: {
      label: "Copy",
      source: `let stickyElementStyle = null;
let stickyElementTop = 0;

function determineStickyState(element) {
  if (!stickyElementStyle) {
    stickyElementStyle = window.getComputedStyle(element);
    stickyElementTop = parseInt(stickyElementStyle.top, 10);
  }
  const currentTop = element.getBoundingClientRect().top;
  element.classList.toggle('is-sticky', currentTop <= stickyElementTop);
}

window.addEventListener('scroll', throttle(determineStickyState, 200));`,
    },
    toc: [
      { id: "challenge", label: "The Challenge" },
      { id: "explanation", label: "Explanation of The Code" },
      { id: "observer", label: "Why Intersection Observer Fails" },
      { id: "takeaways", label: "Takeaways" },
      { id: "faq", label: "Questions" },
    ],
    takeaways: [
      "There is no CSS pseudo-class for a stuck sticky element — detection has to happen in JavaScript.",
      "Cache getComputedStyle once; calling it per scroll event is the expensive part, not the comparison.",
      "Throttle the scroll handler to roughly 200ms — imperceptible to the user, meaningful for the main thread.",
      "Reach for IntersectionObserver only when the element's sticky offset is zero.",
    ],
    faq: [
      {
        question: "Is there a :stuck pseudo-class in CSS?",
        answer:
          "No. The CSS Positioned Layout spec has no state selector for a stuck sticky element, and none is currently shipping in any browser.",
      },
      {
        question: "Does the scroll listener hurt performance?",
        answer:
          "Only if it is unthrottled. Firing once every 200ms and caching the computed style keeps the handler well inside a single frame's budget.",
      },
      {
        question: "When should I use IntersectionObserver instead?",
        answer:
          "When the sticky element has a top offset of zero — typically a site header. It then requires the top: -1px sentinel trick to trigger.",
      },
    ],
    related: {
      label:
        "Understanding Chrome's Coverage Panel — finding the scroll work you didn't know you shipped →",
      href: "/understanding-chromes-coverage-panel",
    },
    prev: {
      label: "← Mastering Task Estimation with the FATE Framework",
      href: "/mastering-task-estimation",
    },
    next: {
      label: "What Is Google Baseline and Its Impact? →",
      href: "/what-is-google-baseline",
    },
  },
};
