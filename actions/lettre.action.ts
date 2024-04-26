"use server";
import axios from "axios";
import { cookies } from "next/headers";
export interface Main {
  result: any[];
  totalCount: number;
  totalPages: number;
  total: Total;
}

export interface Total {
  mnt_imp: string;
  depassement: string;
  tot_creance: string;
  engagement: string;
}