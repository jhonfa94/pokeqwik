import { Slot, component$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';

export default component$(() => {
    return (
        <div class="flex flex-col items-center justify-center mt-2">
            <Navbar />
            <span class="text-5xl">Dashboard Layout</span>
            <Slot />
        </div>
    )
});