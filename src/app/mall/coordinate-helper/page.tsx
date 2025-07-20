'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CoordinateHelper() {
  const [clicks, setClicks] = useState<Array<{x: number, y: number, timestamp: number}>>([])
  const [showGrid, setShowGrid] = useState(false)

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setClicks(prev => [...prev, { x, y, timestamp: Date.now() }])
  }

  const clearClicks = () => {
    setClicks([])
  }

  const generateCode = () => {
    if (clicks.length < 2) return '需要至少点击两个点来定义区域'
    
    const sortedClicks = clicks.slice(-2) // 取最后两个点击
    const x1 = Math.min(sortedClicks[0].x, sortedClicks[1].x)
    const y1 = Math.min(sortedClicks[0].y, sortedClicks[1].y)
    const width = Math.abs(sortedClicks[1].x - sortedClicks[0].x)
    const height = Math.abs(sortedClicks[1].y - sortedClicks[0].y)
    
    return `{
  id: 'merchant-${clicks.length}',
  office_id: 'BLOCK-${clicks.length}',
  rent_price: 10000,
  size: 100,
  name: '',
  description: 'description',
  state: 'available' as const,
  position: { x: ${Math.round(x1)}, y: ${Math.round(y1)}, width: ${Math.round(width)}, height: ${Math.round(height)} }
}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">坐标选择器</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 flex gap-4 items-center">
            <button
              onClick={clearClicks}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              清除点击记录
            </button>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showGrid ? '隐藏网格' : '显示网格'}
            </button>
            <span className="text-sm text-gray-600">
              已点击 {clicks.length} 次
            </span>
          </div>

          <div className="relative inline-block">
            <div 
              className="relative cursor-crosshair"
              onClick={handleImageClick}
            >
              <Image
                src="/map-main.png"
                alt="商场平面图"
                width={800}
                height={600}
                className="border border-gray-300 rounded-lg"
              />
              
              {/* 网格 */}
              {showGrid && (
                <>
                  {Array.from({ length: 80 }, (_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full border-t border-gray-200 opacity-30"
                      style={{ top: `${i * 10}px` }}
                    />
                  ))}
                  {Array.from({ length: 80 }, (_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full border-l border-gray-200 opacity-30"
                      style={{ left: `${i * 10}px` }}
                    />
                  ))}
                </>
              )}
              
              {/* 点击标记 */}
              {clicks.map((click, index) => (
                <div
                  key={click.timestamp}
                  className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg pointer-events-none"
                  style={{
                    left: `${click.x - 6}px`,
                    top: `${click.y - 6}px`,
                  }}
                >
                  <div className="absolute -top-6 -left-2 bg-red-500 text-white text-xs px-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 点击记录 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">点击记录</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clicks.map((click, index) => (
                <div key={click.timestamp} className="bg-gray-50 p-3 rounded border">
                  <div className="text-sm text-gray-600">点击 {index + 1}</div>
                  <div className="font-mono text-sm">
                    x: {Math.round(click.x)}, y: {Math.round(click.y)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 生成的代码 */}
          {clicks.length >= 2 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">生成的商户代码</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{generateCode()}</pre>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                使用方法：点击两个点来定义区域（左上角和右下角），然后复制生成的代码到你的页面中
              </div>
            </div>
          )}

          {/* 使用说明 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">使用说明</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 点击图片上的区块来记录坐标</li>
              <li>• 点击两个点来定义区域（左上角和右下角）</li>
              <li>• 可以显示网格来帮助精确定位</li>
              <li>• 生成的代码可以直接复制到你的页面中使用</li>
              <li>• 红色数字标记显示点击顺序</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 