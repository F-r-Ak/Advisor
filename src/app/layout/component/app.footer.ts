import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <p class="site-footer__bottom-text">
            جميع الحقوق محفوظة &copy;
            <script>
                document.write(new Date().getFullYear());
            </script>
            <a href="#">تطوير لنظم المعلومات</a>
        </p>
    </div>`
})
export class AppFooter {}