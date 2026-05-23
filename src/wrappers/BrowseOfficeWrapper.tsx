'use client';
import React, { useEffect, useState } from 'react';
import OfficeCard from '@/components/OfficeCard';
import { Office } from '@/interfaces/Type';
import { fetchAllOffices } from '@/services/office';
import Link from 'next/link';

const BrowseOfficeWrapper = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOffice = async () => {
    try {
      const res = await fetchAllOffices();
      setOffices(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error({ message: error.message, type: 'danger' });
        setError(error.message);
      } else {
        console.error({ message: 'Terjadi Kesalahan', type: 'danger' });
        setError('Terjadi Kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffice();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div>
      <section
        id="Fresh-Space"
        className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px]"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center">
          Browse Our Fresh Space.
          <br />
          For Your Better Productivity.
        </h2>
        <div className="grid grid-cols-3 gap-[30px]">
          {offices.map((office) => {
            return (
              <Link key={office.id} href={`/office/${office.slug}`}>
                <OfficeCard office={office} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default BrowseOfficeWrapper;
