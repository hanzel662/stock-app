// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "./lib/supabase"

// type Product = {
//   id: string
//   name: string
//   sku: string
//   stock: number
// }

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [filtered, setFiltered] = useState<Product[]>([])
//   const [query, setQuery] = useState("")

//   const [name, setName] = useState("")
//   const [sku, setSku] = useState("")
//   const [stock, setStock] = useState<number>(0)

//   const fetchProducts = async () => {
//     const { data } = await supabase
//       .from("products")
//       .select("*")
//       .order("created_at", { ascending: false })

//     setProducts(data ?? [])
//     setFiltered(data ?? [])
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   useEffect(() => {
//     const q = query.toLowerCase()
//     setFiltered(
//       products.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.sku.toLowerCase().includes(q)
//       )
//     )
//   }, [query, products])

//   const changeStock = async (id: string, value: number) => {
//     if (value < 0) return
//     await supabase.from("products").update({ stock: value }).eq("id", id)
//     fetchProducts()
//   }

//   const updateStockInput = async (id: string, value: number) => {
//     if (value < 0) return
//     await supabase.from("products").update({ stock: value }).eq("id", id)
//     fetchProducts()
//   }

//   const addProduct = async () => {
//     if (!name || !sku) return
//     await supabase.from("products").insert([{ name, sku, stock }])
//     setName("")
//     setSku("")
//     setStock(0)
//     fetchProducts()
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <h1 className="text-3xl font-extrabold mb-6">
//           📦 Stock Barang
//         </h1>

//         {/* FORM TAMBAH */}
//         <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
//           <h2 className="font-bold text-lg mb-4 text-slate-800">
//             Tambah Barang
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//             <input
//               className="border border-slate-300 p-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Nama barang"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               className="border border-slate-300 p-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="SKU"
//               value={sku}
//               onChange={(e) => setSku(e.target.value)}
//             />
//             <input
//               type="number"
//               className="border border-slate-300 p-2 rounded font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Stok"
//               value={stock}
//               onChange={(e) => setStock(Number(e.target.value))}
//             />
//             <button
//               onClick={addProduct}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded px-4 transition"
//             >
//               Tambah
//             </button>
//           </div>
//         </div>

//         {/* SEARCH */}
//         <input
//           className="border border-slate-300 p-2 w-full rounded mb-4 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           placeholder="🔍 Cari nama / SKU"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         {/* TABLE */}
//         <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
//           <table className="w-full">
//             <thead className="bg-slate-100 font-bold text-slate-700">
//               <tr>
//                 <th className="p-3 text-left">Nama</th>
//                 <th className="p-3 text-left">SKU</th>
//                 <th className="p-3 text-center">Stok</th>
//                 <th className="p-3 text-center">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="border-t hover:bg-slate-50 transition"
//                 >
//                   <td className="p-3 font-semibold">
//                     {p.name}
//                   </td>
//                   <td className="p-3 text-slate-500 font-medium">
//                     {p.sku}
//                   </td>

//                   <td className="p-3 text-center">
//                     <input
//                       type="number"
//                       defaultValue={p.stock}
//                       className="w-24 border border-slate-300 rounded text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       onBlur={(e) =>
//                         updateStockInput(p.id, Number(e.target.value))
//                       }
//                     />
//                   </td>

//                   <td className="p-3">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => changeStock(p.id, p.stock - 1)}
//                         className="px-3 py-1 border border-slate-300 rounded font-bold hover:bg-slate-100"
//                       >
//                         −
//                       </button>
//                       <button
//                         onClick={() => changeStock(p.id, p.stock + 1)}
//                         className="px-3 py-1 border border-slate-300 rounded font-bold hover:bg-slate-100"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filtered.length === 0 && (
//             <p className="text-center text-slate-500 font-semibold py-6">
//               Data tidak ditemukan
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

type Product = {
  id: string
  name: string
  sku: string
  stock: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [query, setQuery] = useState("")

  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [stock, setStock] = useState<number>(0)

  /* ======================
     FETCH DATA
  ====================== */
  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    setProducts(data ?? [])
    setFiltered(data ?? [])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  /* ======================
     SEARCH
  ====================== */
  useEffect(() => {
    const q = query.toLowerCase()
    setFiltered(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      )
    )
  }, [query, products])

  /* ======================
     CRUD
  ====================== */

  // ➕ Tambah barang
  const addProduct = async () => {
    if (!name || !sku) return

    await supabase.from("products").insert([{ name, sku, stock }])

    setName("")
    setSku("")
    setStock(0)
    fetchProducts()
  }

  // ➕➖ Update stok via tombol
  const changeStock = async (id: string, value: number) => {
    if (value < 0) return

    await supabase
      .from("products")
      .update({ stock: value })
      .eq("id", id)

    // update UI langsung
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: value } : p))
    )
  }

  // ✍️ Update stok via input
  const updateStockInput = async (id: string, value: number) => {
    if (value < 0) return

    await supabase
      .from("products")
      .update({ stock: value })
      .eq("id", id)

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: value } : p))
    )
  }

  // 🗑️ DELETE BARANG (FIXED)
  const deleteProduct = async (id: string) => {
    const ok = confirm("Yakin mau hapus barang ini?")
    if (!ok) return

    await supabase.from("products").delete().eq("id", id)

    // 🔥 PENTING: update state langsung
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setFiltered((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold mb-6">
          📦 Stock Barang
        </h1>

        {/* FORM TAMBAH */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="font-bold text-lg mb-4">
            Tambah Barang
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="border border-slate-300 p-2 rounded font-semibold"
              placeholder="Nama barang"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-slate-300 p-2 rounded font-semibold"
              placeholder="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <input
              type="number"
              className="border border-slate-300 p-2 rounded font-bold text-center"
              placeholder="Stok"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
            <button
              onClick={addProduct}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <input
          className="border border-slate-300 p-2 w-full rounded mb-4 font-semibold"
          placeholder="🔍 Cari nama / SKU"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* TABLE */}
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-100 font-bold text-slate-700">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-center">Stok</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-semibold">
                    {p.name}
                  </td>
                  <td className="p-3 text-slate-500 font-medium">
                    {p.sku}
                  </td>

                  {/* INPUT STOK */}
                  <td className="p-3 text-center">
                    <input
                      type="number"
                      defaultValue={p.stock}
                      className="w-24 border border-slate-300 rounded text-center font-bold"
                      onBlur={(e) =>
                        updateStockInput(p.id, Number(e.target.value))
                      }
                    />
                  </td>

                  {/* AKSI */}
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => changeStock(p.id, p.stock - 1)}
                        className="px-3 py-1 border rounded font-bold"
                      >
                        −
                      </button>
                      <button
                        onClick={() => changeStock(p.id, p.stock + 1)}
                        className="px-3 py-1 border rounded font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-3 py-1 border border-red-300 text-red-600 rounded font-bold hover:bg-red-50"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 font-semibold py-6">
              Data tidak ditemukan
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
