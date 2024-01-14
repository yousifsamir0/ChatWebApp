function layout({ children }: { children: React.ReactNode }) {



    return (
        <div className="h-full bg-blue-200 p-6">
            <div className='p-4 flex  h-full min-h-[500px] max-h-full justify-center items-center rounded-2xl bg-[#F5F6FA]'>
                {children}
            </div>
        </div>
    );
}

export default layout