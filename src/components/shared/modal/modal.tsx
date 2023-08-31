import type { PropFunction } from '@builder.io/qwik';
import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
    showModal: boolean;
    persistent?: boolean;
    size?: 'sm' | 'md' | 'lg',
    closeFn: PropFunction<() => void>
}

export const Modal = component$(({
    showModal,
    closeFn,
    persistent = false,
    size = 'lg'
}: Props) => {

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div
            id="modal-content"
            // onClick$={closeFn}
            onClick$={(event) => {
                // console.log(event.target.id)
                const elementID = (event.target as HTMLDivElement).id
                if (elementID === 'modal-content' && !persistent) closeFn()
                //closeFn
            }}
            class={showModal ? 'modal-background' : ''}

        >
            <div class={['modal-content', `modal-${size}`]}>

                <div class="mt-3 text-center">

                    <h3 class="modal-title">
                        <Slot name='title' />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content' />
                            {/* <Slot /> */}
                        </div>
                    </div>


                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            onClick$={closeFn}
                        >
                            Cerrar
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
});