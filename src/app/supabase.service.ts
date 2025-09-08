import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
    private supabase: SupabaseClient;
    private supabaseUrl = 'https://awzxdbvkjrxzhvvxhacl.supabase.co';
    private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3enhkYnZranJ4emh2dnhoYWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTczMTgsImV4cCI6MjA3MjMzMzMxOH0.12-1n04cJITdtglayAM1TltI3SqnP5ZgLezvc8Tyh1A';

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async addProduct(product: any) {
        const { data, error } = await this.supabase.from('products').insert([product]);
        if (error) throw error;
        return data;
    }

    async getProducts() {
        const { data, error } = await this.supabase.from('products').select('*');
        if (error) throw error;
        return data;
    }

    async updateProduct(id: number, updates: any) {
        const { data, error } = await this.supabase.from('products').update(updates).eq('id', id);
        if (error) throw error;
        return data;
    }

    async deleteProduct(id: number) {
        const { data, error } = await this.supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return data;
    }

    async logout() {
        await this.supabase.auth.signOut();
    }
}