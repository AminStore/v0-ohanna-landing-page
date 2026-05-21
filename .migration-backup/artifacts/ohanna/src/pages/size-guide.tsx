import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Ruler } from "lucide-react";

const TOPS_SIZES = [
  { size: "XS", chest: "86–91", shoulder: "42", length: "66", sleeve: "59" },
  { size: "S",  chest: "91–97", shoulder: "44", length: "69", sleeve: "61" },
  { size: "M",  chest: "97–102", shoulder: "46", length: "72", sleeve: "63" },
  { size: "L",  chest: "107–112", shoulder: "49", length: "75", sleeve: "65" },
  { size: "XL", chest: "117–122", shoulder: "52", length: "78", sleeve: "67" },
  { size: "XXL", chest: "127–132", shoulder: "55", length: "81", sleeve: "69" },
];

const BOTTOMS_SIZES = [
  { size: "XS", waist: "68–72", hips: "88–92", inseam: "76", rise: "27" },
  { size: "S",  waist: "73–77", hips: "93–97", inseam: "77", rise: "28" },
  { size: "M",  waist: "78–82", hips: "98–102", inseam: "78", rise: "29" },
  { size: "L",  waist: "83–88", hips: "103–108", inseam: "79", rise: "30" },
  { size: "XL", waist: "89–94", hips: "109–114", inseam: "80", rise: "31" },
  { size: "XXL", waist: "95–100", hips: "115–120", inseam: "81", rise: "32" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <Ruler className="h-10 w-10 text-[#C89D29] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            SIZE <span className="text-[#C89D29]">GUIDE</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-md mx-auto text-sm">All measurements in centimeters (cm)</p>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <div>
            <h2 className="text-xl font-black hieroglyph-font mb-4">TOPS — Hoodies, T-Shirts, Jackets</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B1B1B] text-[#FDF8EF]">
                    {["SIZE", "CHEST", "SHOULDER", "LENGTH", "SLEEVE"].map(h => (
                      <th key={h} className="p-3 text-left font-black hieroglyph-font text-xs tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOPS_SIZES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDF8EF]"}>
                      <td className="p-3 font-black text-[#C89D29]">{row.size}</td>
                      <td className="p-3">{row.chest}</td>
                      <td className="p-3">{row.shoulder}</td>
                      <td className="p-3">{row.length}</td>
                      <td className="p-3">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black hieroglyph-font mb-4">BOTTOMS — Joggers, Shorts, Track Pants</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B1B1B] text-[#FDF8EF]">
                    {["SIZE", "WAIST", "HIPS", "INSEAM", "RISE"].map(h => (
                      <th key={h} className="p-3 text-left font-black hieroglyph-font text-xs tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BOTTOMS_SIZES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDF8EF]"}>
                      <td className="p-3 font-black text-[#C89D29]">{row.size}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.hips}</td>
                      <td className="p-3">{row.inseam}</td>
                      <td className="p-3">{row.rise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ohanna-card p-6 bg-[#C89D29]/10">
            <h3 className="font-black hieroglyph-font text-sm mb-3">FITTING TIPS</h3>
            <ul className="space-y-2 text-sm text-[#1B1B1B]/70">
              <li>• OHANNA pieces run <strong>true to size</strong></li>
              <li>• For oversized fits (hoodies), consider <strong>sizing up one</strong></li>
              <li>• If between sizes, go <strong>larger</strong></li>
              <li>• All measurements are in <strong>centimeters</strong></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
