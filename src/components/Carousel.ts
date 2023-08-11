import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeSection } from './Section';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-carousel';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),
        extend: 'carousel',
        model: {
            ...coreMjmlModel,
            defaults: {
                resizable: false,
                highlightable: false,
                name: getName(editor, 'carousel'),
                draggable: componentsToQuery([typeSection, typeColumn, typeHero]),
            },
        },
        view: {
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {
                style: 'pointer-events: all; display: table; width: 100%; user-select: none;',
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body width="auto"><mj-column>`,
                    end: `</mj-column></mj-body></mjml>`,
                };
            },

            getTemplateFromEl(sandboxEl: any) {
                return sandboxEl.querySelector('tr').innerHTML;
            },

            getChildrenSelector() {
                return 'img';
            },
        },
    });
};