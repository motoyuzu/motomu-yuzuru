'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Post = {
  id: string;
  type: 'motomu' | 'yuzuru';
  item_name: string;
  description: string;
  created_at: string;
};

export default function Home() {
  const [tab, setTab] = useState<'motomu' | 'yuzuru'>('motomu');
  const [posts, setPosts] = useState<Post[]>([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // 投稿データの取得
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data as Post[]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 新規投稿の保存
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('posts').insert([
      {
        type: tab,
        item_name: itemName,
        description: description,
      },
    ]);

    setLoading(false);
    if (!error) {
      setItemName('');
      setDescription('');
      fetchPosts();
    } else {
      alert('投稿に失敗しました。もう一度お試しください。');
    }
  };

  const filteredPosts = posts.filter((p) => p.type === tab);

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>モトムユズル</h1>
        <p style={styles.subtitle}>現地限定 グッズ交換・譲渡掲示板</p>
      </header>

      {/* タブ切り替え */}
      <div style={styles.tabContainer}>
        <button
          style={tab === 'motomu' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setTab('motomu')}
        >
          モトム（探す）
        </button>
        <button
          style={tab === 'yuzuru' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setTab('yuzuru')}
        >
          ユズル（譲る）
        </button>
      </div>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>
          {tab === 'motomu' ? '欲しいグッズを登録' : '譲れるグッズを登録'}
        </h2>
        <input
          type="text"
          placeholder={tab === 'motomu' ? '例：缶バッジ A賞 / トレカ' : '例：アクリルスタンド B賞'}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder={
            tab === 'motomu'
              ? '例：〇〇の衣装のものを探しています！会場正面付近にいます。'
              : '例：定価でお譲り可能です。ガチャ前にいます。'
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          rows={3}
        />
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? '送信中...' : tab === 'motomu' ? 'モトムに登録' : 'ユズルに登録'}
        </button>
      </form>

      {/* 一覧表示 */}
      <section style={styles.listSection}>
        <h2 style={styles.sectionTitle}>
          {tab === 'motomu' ? '求めている人一覧' : '譲れる人一覧'}
        </h2>
        {filteredPosts.length === 0 ? (
          <p style={styles.emptyText}>現在、登録されている投稿はありません。</p>
        ) : (
          <ul style={styles.list}>
            {filteredPosts.map((post) => (
              <li key={post.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.badge}>
                    {post.type === 'motomu' ? '求' : '譲'}
                  </span>
                  <h3 style={styles.itemName}>{post.item_name}</h3>
                </div>
                {post.description && <p style={styles.cardDesc}>{post.description}</p>}
                <span style={styles.time}>
                  {new Date(post.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

// モバイル最適化インラインスタイル
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  subtitle: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  },
  tabContainer: {
    display: 'flex',
    borderRadius: '12px',
    backgroundColor: '#e5e7eb',
    padding: '4px',
    marginBottom: '16px',
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
    cursor: 'pointer',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    color: '#111827',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginBottom: '12px',
    boxSizing: 'border-box',
    resize: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  listSection: {
    marginTop: '8px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '12px',
  },
  emptyText: {
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center',
    padding: '24px 0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '12px 16px',
    borderRadius: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  cardDesc: {
    fontSize: '13px',
    color: '#4b5563',
    marginTop: '6px',
    marginBottom: '4px',
  },
  time: {
    fontSize: '11px',
    color: '#9ca3af',
    display: 'block',
    textAlign: 'right',
  },
};
