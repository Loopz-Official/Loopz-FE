'use client';

export default function ContactButton() {
    const handleButtonClick = () => {
        if (typeof window === 'undefined') return;

        window.open('https://tr.ee/9KOLZHgod4', '_black');
    };

    return (
        <button
            onClick={handleButtonClick}
            className="text-gray-dark text-caption-01 rounded-full bg-white px-3 py-2 font-medium tracking-normal"
        >
            Contact us
        </button>
    );
}
