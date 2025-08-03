<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'barcode' => 'required|string|unique:items,barcode',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'stock_quantity' => 'required|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'smallest_unit' => 'required|string|max:50',
            'is_active' => 'boolean',
            'uoms' => 'array',
            'uoms.*.name' => 'required|string|max:50',
            'uoms.*.conversion_factor' => 'required|integer|min:1',
            'uoms.*.cost_price' => 'required|numeric|min:0',
            'uoms.*.sale_price' => 'required|numeric|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'barcode.required' => 'Barcode is required.',
            'barcode.unique' => 'This barcode already exists.',
            'name.required' => 'Item name is required.',
            'category_id.required' => 'Category is required.',
            'category_id.exists' => 'Selected category does not exist.',
            'stock_quantity.required' => 'Stock quantity is required.',
            'cost_price.required' => 'Cost price is required.',
            'sale_price.required' => 'Sale price is required.',
            'smallest_unit.required' => 'Smallest unit is required.',
        ];
    }
}