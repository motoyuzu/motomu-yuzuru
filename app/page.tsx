'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'motomu' | 'yuzuru'>('motomu');
  const [checkedIn, setCheckedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // デモ用データ
  const motomuItems = [
    {
      id: 1,
      title: '缶バッジ A賞',
      condition: 'トレード希望（求：B賞）',
      user: '20代・女性',
      type: '缶バッジ',
    },
    {
      id: 2,
      title: 'アクリルスタンド B',
      condition: '定価買い取り希望',
      user: '30代・男性',
      type: 'アクスタ',
    },
  ];

  const myYuzuruItem = {
    title: '缶バッジ B賞',
    status: '募集中',
    time: '15分前',
    condition: 'トレード / 定価譲渡可',
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 text-gray-900 pb-10">
      {/* ヘッダー・チェックイン */}
      <header className="bg-white p-4 border-b sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold tracking-tight text-blue-600">モトムユズル</h1>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">PWA Ver.</span>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between border border-blue-100">
          <div>
            <p className="text-xs text-blue-600 font-semibold">現在のイベント</p>
            <p className="text-sm font-bold">東京ドーム - ドームツアー2026</p>
          </div>
          <button
            onClick={() => setCheckedIn(!checkedIn)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              checkedIn
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white shadow hover:bg-blue-700'
            }`}
          >
            {checkedIn ? '📍 チェックイン済' : 'GPSチェックイン'}
          </button>
        </div>
      </header>

      {/* メイン切り替えタブ（モトム / ユズル） */}
      <div className="flex border-b bg-white">
        <button
          onClick={() => setActiveTab('motomu')}
          className={`flex-1 py-3 text-center font-bold text-lg border-b-2 transition-all ${
            activeTab === 'motomu'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400'
          }`}
        >
          モトム
        </button>
        <button
          onClick={() => setActiveTab('yuzuru')}
          className={`flex-1 py-3 text-center font-bold text-lg border-b-2 transition-all ${
            activeTab === 'yuzuru'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400'
          }`}
        >
          ユズル
        </button>
      </div>

      {/* コンテンツ表示領域 */}
      <main className="p-4">
        {activeTab === 'motomu' ? (
          /* 【モトム】一覧・検索・閲覧画面 */
          <div className="space-y-4">
            {/* 検索バー */}
            <div>
              <input
                type="text"
                placeholder="例：東京ドーム / 缶バッジ / メンバー名"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* カテゴリーフィルター */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium whitespace-nowrap">すべて</span>
              <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full whitespace-nowrap">缶バッジ</span>
              <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full whitespace-nowrap">アクスタ</span>
              <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full whitespace-nowrap">トレカ</span>
            </div>

            {/* 一覧リスト */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500">現在募集中のアイテム</p>
              {motomuItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-bold shrink-0">
                    [写真]
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm">{item.title}</h3>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{item.user}</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1 font-medium">{item.condition}</p>
                    </div>
                    <button className="w-full bg-blue-600 text-white text-xs font-bold py-1.5 rounded-lg mt-2 shadow-sm">
                      交換・交渉を申し込む
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 【ユズル】自分が出すグッズ・管理画面 */
          <div className="space-y-4">
            <button className="w-full bg-green-600 text-white font-bold p-3 rounded-xl shadow-sm text-sm flex items-center justify-center gap-1">
              <span>＋</span> 新しく譲るグッズを登録する
            </button>

            {/* 出品中アイテム */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500">現在出品中のグッズ</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                  🔵 {myYuzuruItem.status}
                </span>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-bold shrink-0">
                  [写真]
                </div>
                <div>
                  <h3 className="font-bold text-sm">{myYuzuruItem.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{myYuzuruItem.condition}</p>
                  <p className="text-[10px] text-gray-400 mt-2">投稿: {myYuzuruItem.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 border text-xs font-bold py-2 rounded-lg text-gray-600">編集</button>
                <button className="flex-1 border border-red-200 text-xs font-bold py-2 rounded-lg text-red-600">募集終了</button>
              </div>
            </div>

            {/* 取引履歴 */}
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-500 mb-2">過去の取引履歴</p>
              <div className="bg-white p-3 rounded-xl border border-gray-100 text-xs flex justify-between items-center">
                <span className="font-medium text-gray-700">アクリルスタンド A賞</span>
                <span className="text-green-600 font-bold">🟢 取引完了</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
