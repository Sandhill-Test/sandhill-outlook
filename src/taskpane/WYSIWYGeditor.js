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
import "tinymce/plugins/save";
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
  const editorUtil = {
    license_key: "gpl",
    inline: true,
    image_title: true,
    automatic_uploads: true,
    file_picker_types: "image",
    // below copied from tinymce documentation - will tweak some things later
    file_picker_callback: (cb, value, meta) => {
      // check to append to document or an element
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      // link with db
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          /* call the callback and populate the Title field with the file name */
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });

      input.click();
    },
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
  };
  const solutionOpt = {
    selector: "div#form-solution",
    menubar: true,
    plugins: "advlist code link image lists table save",
    toolbar: [
      "undo redo save | bold italic underline | fontfamily fontsize",
      "forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | image",
    ],

    paste_postprocess: (plugin, args) => {
      // Remove Word's inline bullet character spans
      args.node.querySelectorAll("span[style*='mso-list']").forEach((el) => el.remove());
      // Strip Word-specific styles and classes from list elements
      args.node.querySelectorAll("ul, ol, li").forEach((el) => {
        el.removeAttribute("style");
        el.removeAttribute("class");
      });
    },
  };

  const descOpt = {
    selector: "div#form-description",
    menubar: false,
    plugins: "image",
    toolbar: ["bold italic underline image"],
  };
  const sympOpt = {
    selector: "div#form-symptom",
    menubar: false,
    plugins: "image",
    toolbar: ["bold italic underline image"],
  };

  const solutionEditor = { ...editorUtil, ...solutionOpt };
  const descriptionEditor = { ...editorUtil, ...descOpt };
  const symptomEditor = { ...editorUtil, ...sympOpt };
  // solution editor
  tinymce.init(solutionEditor);
  tinymce.init(descriptionEditor);
  tinymce.init(symptomEditor);
}
export function getEditorContent(editorId) {
  try {
    const content = tinymce.get(editorId);
    return content.getContent();
  } catch (err) {
    console.error("error retrieving content", err);
    return "";
  }
}

export function setEditorContent(editorId, text) {
  try {
    const ed = tinymce.get(editorId);
    ed.setContent(text);
  } catch (err) {
    console.error("error setting content", err);
  }
}
