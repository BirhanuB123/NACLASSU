import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
  publishDate: string;
  createdAt: string;
}

const NewsManagement = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    published: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing news item
      setNewsItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        )
      );
      toast({
        title: "News Updated",
        description: "News article has been updated successfully.",
      });
    } else {
      // Create new news item
      const newItem: NewsItem = {
        id: Date.now().toString(),
        ...formData,
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      setNewsItems(items => [...items, newItem]);
      toast({
        title: "News Created",
        description: "New news article has been created successfully.",
      });
    }

    // Reset form
    setFormData({ title: '', content: '', author: '', published: false });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      author: item.author,
      published: item.published,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      setNewsItems(items => items.filter(item => item.id !== id));
      toast({
        title: "News Deleted",
        description: "News article has been deleted successfully.",
      });
    }
  };

  const togglePublish = (id: string) => {
    setNewsItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, published: !item.published }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">News Management</h3>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add News Article
        </Button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-semibold mb-4">
            {editingItem ? 'Edit News Article' : 'Create New Article'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {editingItem ? 'Update Article' : 'Create Article'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setFormData({ title: '', content: '', author: '', published: false });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No news articles found. Create your first article!
                </TableCell>
              </TableRow>
            ) : (
              newsItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <Button
                      variant={item.published ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePublish(item.id)}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </Button>
                  </TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsManagement;