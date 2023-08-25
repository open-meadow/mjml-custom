// my component
import type { Editor } from "grapesjs";
import { componentsToQuery, getName, isComponentType } from "./utils";
import { type as typeSection } from "./Section";
import { type as typeColumn } from "./Column";
import { type as typeHero } from "./Hero";
import { type as typeCarousel } from "./Carousel";

export const type = "mj-carousel-image";

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  console.log("carousel-image");
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, "carousel-image"),
        resizable: true,
        highlightable: true,
        draggable: componentsToQuery([
          typeSection,
          typeColumn,
          typeHero,
          typeCarousel,
        ]),
        stylable: [
          "width",
          "height",
          "padding",
          "padding-top",
          "padding-left",
          "padding-right",
          "padding-bottom",
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-left-radius",
          "border-bottom-right-radius",
          "border",
          "border-width",
          "border-style",
          "border-color",
          "container-background-color",
          "align",
        ],
        "style-default": {
          border: "3px solid green",
        },
        traits: [
          {
            type: "select",
            label: "Icon",
            name: "name",
            options: [
              { value: "custom", name: "Custom" },
              { value: "facebook", name: "Facebook" },
              { value: "twitter", name: "Twitter" },
              { value: "google", name: "Google" },
              { value: "instagram", name: "Instagram" },
              { value: "web", name: "Web" },
              { value: "youtube", name: "Youtube" },
              { value: "pinterest", name: "Pinterest" },
              { value: "linkedin", name: "Linkedin" },
              { value: "snapchat", name: "Snapchat" },
              { value: "vimeo", name: "Vimeo" },
              { value: "tumblr", name: "Tumblr" },
              { value: "github", name: "Github" },
              { value: "soundcloud", name: "SoundCloud" },
              { value: "medium", name: "Medium" },
              { value: "dribbble", name: "Dribbble" },
              { value: "xing", name: "Xing" },
            ],
          },
          { name: "src" },
          { name: "href" },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: "table",
      attributes: {
        style: "width: 90%;",
      },

      getMjmlTemplate() {
        let parentView = this.model.parent()?.view;

        let mjmlCarousel = coreMjmlView.getInnerMjmlTemplate.call(parentView);
        console.log("mjmlCAr: ", mjmlCarousel);
        return {
          start: `<mjml><mj-body width="auto"><mj-section>${mjmlCarousel.start}`,
          end: `${mjmlCarousel.end}</mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector("tr").innerHTML;
      },

      getChildrenSelector() {
        return "img";
      },
    },
  });
};
