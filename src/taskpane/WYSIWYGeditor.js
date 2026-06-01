/* Import TinyMCE */
import tinymce from "tinymce";

/* Skin CSS — bundled via webpack to avoid MIME type issues with devServer */
import "tinymce/skins/ui/oxide/skin.min.css";

/* Default icons are required. After that, import custom icons if applicable */
import "tinymce/icons/default";

/* Required TinyMCE components */
import "tinymce/themes/silver";
import "tinymce/models/dom";

/* Import plugins */
import "tinymce/plugins/advlist";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";

/* Initialize TinyMCE */
export function render() {
  tinymce.init({
    selector: "textarea#basic-example",
    plugins: "advlist code emoticons link lists table help",
    license_key: "gpl",
    toolbar: "bold italic | bullist numlist | link emoticons",
    base_url: "/tinymce",
    suffix: ".min",
    skin: false,
  });
}
