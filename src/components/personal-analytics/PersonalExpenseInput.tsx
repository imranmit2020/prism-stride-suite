import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Receipt, MapPin } from "lucide-react";
import { usePersonalFinance } from "@/hooks/usePersonalFinance";

export function PersonalExpenseInput() {
  const { addExpense, categories, loading } = usePersonalFinance();
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    category_id: "",
    payment_method: "",
    merchant: "",
    location: "",
    receipt_url: "",
    notes: "",
    is_recurring: false,
    recurrence_pattern: "",
    is_tax_deductible: false,
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseData.amount || !expenseData.description) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addExpense({
        amount: parseFloat(expenseData.amount),
        description: expenseData.description,
        date: expenseData.date,
        category_id: expenseData.category_id || undefined,
        payment_method: expenseData.payment_method || undefined,
        merchant: expenseData.merchant || undefined,
        location: expenseData.location || undefined,
        receipt_url: expenseData.receipt_url || undefined,
        notes: expenseData.notes || undefined,
        is_recurring: expenseData.is_recurring,
        recurrence_pattern: expenseData.is_recurring ? expenseData.recurrence_pattern || undefined : undefined,
        is_tax_deductible: expenseData.is_tax_deductible,
        tags: expenseData.tags.length > 0 ? expenseData.tags : undefined
      });

      // Reset form
      setExpenseData({
        amount: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
        category_id: "",
        payment_method: "",
        merchant: "",
        location: "",
        receipt_url: "",
        notes: "",
        is_recurring: false,
        recurrence_pattern: "",
        is_tax_deductible: false,
        tags: []
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !expenseData.tags.includes(newTag.trim())) {
      setExpenseData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setExpenseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const expenseCategories = categories.filter(cat => cat.category_type === 'expense');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Add Personal Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={expenseData.amount}
                onChange={(e) => setExpenseData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={expenseData.date}
                onChange={(e) => setExpenseData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={expenseData.description}
              onChange={(e) => setExpenseData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={expenseData.category_id} onValueChange={(value) => setExpenseData(prev => ({ ...prev, category_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color || '#3B82F6' }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select value={expenseData.payment_method} onValueChange={(value) => setExpenseData(prev => ({ ...prev, payment_method: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant/Vendor</Label>
              <Input
                id="merchant"
                placeholder="Where did you make this purchase?"
                value={expenseData.merchant}
                onChange={(e) => setExpenseData(prev => ({ ...prev, merchant: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Where did this expense occur?"
                  className="pl-10"
                  value={expenseData.location}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt_url">Receipt URL</Label>
            <Input
              id="receipt_url"
              type="url"
              placeholder="Link to receipt image or document"
              value={expenseData.receipt_url}
              onChange={(e) => setExpenseData(prev => ({ ...prev, receipt_url: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {expenseData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="is_tax_deductible">Tax Deductible</Label>
              <Switch
                id="is_tax_deductible"
                checked={expenseData.is_tax_deductible}
                onCheckedChange={(checked) => setExpenseData(prev => ({ ...prev, is_tax_deductible: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_recurring">Recurring Expense</Label>
              <Switch
                id="is_recurring"
                checked={expenseData.is_recurring}
                onCheckedChange={(checked) => setExpenseData(prev => ({ ...prev, is_recurring: checked }))}
              />
            </div>

            {expenseData.is_recurring && (
              <div className="space-y-2">
                <Label htmlFor="recurrence_pattern">Recurrence Pattern</Label>
                <Select value={expenseData.recurrence_pattern} onValueChange={(value) => setExpenseData(prev => ({ ...prev, recurrence_pattern: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional details about this expense"
              value={expenseData.notes}
              onChange={(e) => setExpenseData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || loading} className="w-full">
            {isSubmitting ? "Adding Expense..." : "Add Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}