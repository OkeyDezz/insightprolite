'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Tenta obter a sessão atual para testar a conexão
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setIsConnected(true)
        setError(null)
      } catch (err) {
        setIsConnected(false)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      }
    }

    testConnection()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Hello, InsightPro!
      </h1>
      
      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Status da Conexão Supabase:</h2>
        
        {isConnected === null ? (
          <p className="text-gray-600">Testando conexão...</p>
        ) : isConnected ? (
          <p className="text-green-600 font-medium">
            ✅ Conectado ao Supabase com sucesso!
          </p>
        ) : (
          <p className="text-red-600 font-medium">
            ❌ Erro na conexão com Supabase
          </p>
        )}

        {error && (
          <p className="mt-2 text-sm text-gray-600">
            Detalhes: {error}
          </p>
        )}
      </div>
    </main>
  )
}
