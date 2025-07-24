import React from 'react';
import { useRobotFleet } from './hooks/useRobotFleet';
import { RobotCanvas } from './components/RobotCanvas';
import { ControlPanel } from './components/ControlPanel';
import { StatsPanel } from './components/StatsPanel';
import { RobotDetails } from './components/RobotDetails';
import { Bot, Cpu, Shield, Zap } from 'lucide-react';

function App() {
  const {
    robots,
    selectedRobots,
    setSelectedRobots,
    isRunning,
    setIsRunning,
    formation,
    aiEnabled,
    setAiEnabled,
    emergencyMode,
    activateRobots,
    deactivateRobots,
    emergencyStop,
    setFormationPattern,
    assignMission,
    getFleetStats
  } = useRobotFleet();

  const stats = getFleetStats();

  const handleRobotSelect = (robotId: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      const newSelection = new Set(selectedRobots);
      if (newSelection.has(robotId)) {
        newSelection.delete(robotId);
      } else {
        newSelection.add(robotId);
      }
      setSelectedRobots(newSelection);
    } else {
      setSelectedRobots(new Set([robotId]));
    }
  };

  const handleSelectAll = () => {
    setSelectedRobots(new Set(robots.map(r => r.id)));
  };

  const handleDeselectAll = () => {
    setSelectedRobots(new Set());
  };

  const handleActivateSelected = () => {
    activateRobots(Array.from(selectedRobots));
  };

  const handleDeactivateSelected = () => {
    deactivateRobots(Array.from(selectedRobots));
  };

  const handleAssignMission = (mission: string, priority: 'low' | 'medium' | 'high' | 'critical') => {
    assignMission(Array.from(selectedRobots), mission, priority);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Advanced Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-cyan-500 shadow-2xl">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bot className="w-10 h-10 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  RoboFleet Command Center
                </h1>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Advanced Autonomous Robot Fleet Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-600 rounded-full">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span className="text-green-300 font-medium">System Online</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-600 rounded-full">
                  <Zap className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-300 font-medium">AI {aiEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-gray-400 text-sm">Fleet Status</div>
                <div className="text-cyan-400 font-bold text-lg">
                  {stats.activeRobots}/{stats.totalRobots} Active
                </div>
              </div>
              
              <div className="text-gray-400 text-sm">
                <div>Version 3.0.0</div>
                <div>Neural Core</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Main Control Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Advanced Visualization */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500 rounded-xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  Fleet Visualization Matrix
                </h2>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>1000 Units Deployed</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Real-time Neural Sync</span>
                  </div>
                </div>
              </div>
              
              <RobotCanvas
                robots={robots}
                selectedRobots={selectedRobots}
                onRobotSelect={handleRobotSelect}
                width={800}
                height={600}
              />
              
              <div className="mt-6 flex items-center justify-between text-xs">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                    <span className="text-green-300">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                    <span className="text-blue-300">Charging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                    <span className="text-purple-300">Patrol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                    <span className="text-yellow-300">Maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    <span className="text-red-300">Error</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-300">Inactive</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  <span className="text-cyan-400">Click</span> to select • 
                  <span className="text-cyan-400"> Ctrl+Click</span> for multi-select • 
                  <span className="text-cyan-400"> AI-powered</span> coordination
                </div>
              </div>
            </div>

            <RobotDetails robots={robots} selectedRobots={selectedRobots} />
          </div>

          {/* Advanced Control Panel */}
          <div className="xl:col-span-1">
            <ControlPanel
              isRunning={isRunning}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onEmergencyStop={emergencyStop}
              selectedCount={selectedRobots.size}
              onActivateSelected={handleActivateSelected}
              onDeactivateSelected={handleDeactivateSelected}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              formation={formation}
              onFormationChange={setFormationPattern}
              aiEnabled={aiEnabled}
              onAiToggle={() => setAiEnabled(!aiEnabled)}
              onAssignMission={handleAssignMission}
              emergencyMode={emergencyMode}
            />
          </div>

          {/* Advanced Stats Panel */}
          <div className="xl:col-span-1">
            <StatsPanel stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
