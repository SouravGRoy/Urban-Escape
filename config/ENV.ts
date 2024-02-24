class ENV{
    static UE_BUCKET:string= process.env.NEXT_PUBLIC_UE_BUCKET!
    static SUPABASE_URL:string= process.env.NEXT_PUBLIC_SUPABASE_URL!
}
export default ENV;