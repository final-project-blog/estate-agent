import React from 'react';

export default function Search() {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen bg-blue-200'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap text-black font-bold text-xl'>Suche</label>
                        <input 
                            type="text" 
                            id="search" 
                            placeholder="Suche" 
                            className='border rounded-lg p-3 w-full text-black text-lg' 
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='text-black font-semibold'>Typ</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="all" className='w-5' />
                            <span className='text-black'>Mieten & Verkaufen</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="rent" className='w-5' />
                            <span className='text-black'>Mieten</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="sale" className='w-5' />
                            <span className='text-black'>Verkaufen</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id="offer" className='w-5' />
                            <span className='text-black'>Angebot</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='text-black font-semibold'>Annehmlichkeiten</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span className='text-black'>Parkplatz</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span className='text-black'>Möbliert</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-black font-semibold'>Sortieren</label>
                        <select id='sort_order' className='border rounded-lg p-3'>
                            <option>Preis hoch zu niedrig</option>
                            <option>Preis niedrig zu hoch</option>
                            <option>Neueste</option>
                            <option>Älteste</option>
                        </select>
                    </div>
                    <button className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Suche starten
                    </button>
                </form>
            </div>
            <div className=''>
                <h1 className='text-3xl font-semibold border-b p-3 text-black mt-5'>Suchergebnisse:</h1>
            </div>
        </div>
    );
}


        