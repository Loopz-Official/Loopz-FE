const CartCount = ({ count }: { count: number }) => {
    return (
        <div className="absolute bottom-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-lg bg-black px-1 text-[10px] font-normal tracking-normal text-white">
            {count}
        </div>
    );
};

export default CartCount;
