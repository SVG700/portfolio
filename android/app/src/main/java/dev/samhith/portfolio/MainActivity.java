package dev.samhith.portfolio;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The project previews are drawn at desktop size and scaled down with
        // CSS. WebView's default minimum font size (8px) would inflate their
        // tiny labels, so let text scale with the rest of the preview.
        WebSettings settings = getBridge().getWebView().getSettings();
        settings.setMinimumFontSize(1);
        settings.setMinimumLogicalFontSize(1);
    }
}
