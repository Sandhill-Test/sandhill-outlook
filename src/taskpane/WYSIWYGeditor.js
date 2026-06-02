/* Import TinyMCE */
import tinymce from "tinymce";

/* Skin CSS — bundled via webpack to avoid MIME type issues with devServer */
import "tinymce/skins/ui/oxide-dark/skin.min.css";

/* Default icons are required. After that, import custom icons if applicable */
import "tinymce/icons/default";

/* Required TinyMCE components */
import "tinymce/themes/silver";
import "tinymce/models/dom";

/* Import plugins */
import "tinymce/plugins/advlist";
import "tinymce/plugins/code";
// import "tinymce/plugins/emoticons";
// import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";

/* Initialize TinyMCE */
// export function render() {
//   tinymce.init({
//     selector: "div#basic-example",
//     inline: true,
//     plugins: "advlist code emoticons link image lists table help quickbars",
//     license_key: "gpl",
//     toolbar:
//       "undo redo | blocks | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist",
//     base_url: "/tinymce",
//     suffix: ".min",
//     promotion: false,
//     statusbar: false,
//     skin: false,
//     content_css: false,
//     content_style: `
//       body {
//         background-color: #262626;
//         color: #ffffff;
//         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//         line-height: 1.4;
//         margin: 1rem;
//       }
//       a { color: #4099ff; }
//       table { border-collapse: collapse; }
//       table:not([cellpadding]) th, table:not([cellpadding]) td { padding: 0.4rem; }
//       hr { border-color: #6d737b; border-width: 1px 0 0 0; }
//       code { background-color: #6d737b; border-radius: 3px; padding: 0.1rem 0.2rem; }
//     `,
//   });
// }
export function render() {
  tinymce.init({
    license_key: "gpl",
    selector: "div#basic-example",
    inline: true,
    menubar: false,
    plugins: "advlist code emoticons link image lists table help quickbars",
    toolbar: [
      "undo redo | bold italic underline | fontfamily fontsize",
      "forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent",
    ],
    base_url: "/tinymce",
    suffix: ".min",
    promotion: false,
    statusbar: false,
    skin: false,
    content_css: false,
    content_style: `
      body {
        background-color: #262626;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.4;
        margin: 1rem;
      }
      a { color: #4099ff; }
      table { border-collapse: collapse; }
      table:not([cellpadding]) th, table:not([cellpadding]) td { padding: 0.4rem; }
      hr { border-color: #6d737b; border-width: 1px 0 0 0; }
      code { background-color: #6d737b; border-radius: 3px; padding: 0.1rem 0.2rem; }
    `,
  });
}
export function getEditorContent() {
  try {
    // const content = tinymce.get("basic-example").getContent;
    const content = tinymce.activeEditor;
    const htmlContent = content.getContent();
    return htmlContent;
    console.log(content);
  } catch (err) {
    console.error("error retrieving content", err);
  }
}

export function setEditorContent(text) {
  const editor = tinymce.activeEditor;
  const html = editor.setContent(text);
  try {
  } catch (err) {
    console.error("error setting content", err);
  }
}
