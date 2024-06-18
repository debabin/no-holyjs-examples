import type { Page } from '@playwright/test';

export const disableAnimation = async (page: Page) => {
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = `
            *, *:before, *:after {
              /*CSS transitions*/
              -o-transition-property: none !important;
              -moz-transition-property: none !important;
              -ms-transition-property: none !important;
              -webkit-transition-property: none !important;
              transition-property: none !important;
                
              /*CSS transforms*/
              -o-transform: none !important;
              -moz-transform: none !important;
              -ms-transform: none !important;
              -webkit-transform: none !important;
              transform: none !important;
                
              /*CSS animations*/
              -webkit-animation: none !important;
              -moz-animation: none !important;
              -o-animation: none !important;
              -ms-animation: none !important;
              animation: none !important;
              }
          `;
    document.head.appendChild(style);
  });
};
